package com.vou.app.controller;

import com.vou.app.entity.Vouchers;
import com.vou.app.model.VoucherTransaction;
import com.vou.app.repository.VoucherRepository;
import com.vou.app.service.UserItemService;
import com.vou.app.service.VoucherTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/games/vouchers")
public class VoucherController {
    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private VoucherTransactionService voucherTransactionService;

    @Autowired
    private UserItemService userItemService;


    @GetMapping("/view-detail/{voucherId}")
    public ResponseEntity<Vouchers> getVoucherByVoucherId(@PathVariable Long voucherId) {
        Optional<Vouchers> voucher = voucherRepository.findById(voucherId);
        if (voucher.isPresent()) {
            Vouchers result = voucher.get();
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Vouchers>> getVouchersByUserId(@PathVariable Long userId) {
        try {
            List<VoucherTransaction> voucherTransactions = voucherTransactionService.getTransactionsByUserId(userId);
            List<Vouchers> vouchers = new ArrayList<>();
            for (VoucherTransaction voucherTransaction : voucherTransactions) {
                Optional<Vouchers> voucher = voucherRepository.findById(voucherTransaction.getVoucherId());
                if(voucher.isPresent()){
                    voucher.get().setCount(voucherTransaction.getQuantity());
                    vouchers.add(voucher.get());
                }
            }
            return ResponseEntity.ok(vouchers);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/event/{eventId}")
    public ResponseEntity<Page<Vouchers>> getVoucherByEventId(
            @PathVariable Long eventId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Vouchers> vouchersPage = voucherRepository.findVouchersByEventId(eventId, pageable);
            System.out.println("Found vouchers: " + vouchersPage.getNumberOfElements());
            for (Vouchers voucher : vouchersPage.getContent()) {
                System.out.println(voucher.getCode());
            }
            if (vouchersPage.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(vouchersPage);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // get a random voucher from the event that still has available vouchers
    @GetMapping("/event/{eventId}/random")
    public ResponseEntity<Vouchers> getRandomVoucherByEventId(@PathVariable Long eventId,
                                                              @RequestParam Long userId,
                                                              @RequestParam Long eventgameId) {
        try {
            System.out.println("Getting random voucher for event: " + eventId);
            List<Vouchers> vouchers = voucherRepository.findByEventId(eventId);
            if (vouchers.isEmpty()) {
                System.out.println("No vouchers found");
                return ResponseEntity.noContent().build();
            }
            // for every voucher in the event, check if total quantity of voucher of
            // every vouchertransaction has voucherId = voucher.id is less than quantity
            List<Vouchers> availableVouchers = new ArrayList<>();

            for(Vouchers voucher : vouchers) {
                List<VoucherTransaction> voucherTransactions =
                        voucherTransactionService.getTransactionsByVoucherId(voucher.getId());
                int totalQuantity = 0;
                for (VoucherTransaction voucherTransaction : voucherTransactions) {
                    totalQuantity += voucherTransaction.getQuantity();
                }
                if (totalQuantity < voucher.getCount()) {
                    availableVouchers.add(voucher);
                }
            }

            if (availableVouchers.isEmpty()) {
                System.out.println("No available vouchers found");
                return ResponseEntity.noContent().build();
            }
            // get the highest value voucher
            availableVouchers.sort((v1, v2) -> v2.getValue().compareTo(v1.getValue()));
            Vouchers randomVoucher = availableVouchers.get(0);

            // save the voucher transaction
            VoucherTransaction voucherTransaction = new VoucherTransaction();
            voucherTransaction.setVoucherId(randomVoucher.getId());
            voucherTransaction.setUserId(userId);
            voucherTransaction.setQuantity(1);
            voucherTransactionService.createTransaction(voucherTransaction);

            // reduce quantity of user items that combine into the voucher
            // for example, if the voucher is a combination of 3 items, reduce the quantity of the 3 items
            // in the user's inventory by 1
            userItemService.getUserItemsByUserAndEvent(userId, eventId).forEach(userItem -> {
                System.out.println("Adjusting quantity for user item: " + userItem.getId());
                userItemService.adjustQuantity(userId, userItem.getId().getItemsID(), -1);
            });

            return ResponseEntity.ok(randomVoucher);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

