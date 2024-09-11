package com.vou.app.controller;

import com.vou.app.model.VoucherTransaction;
import com.vou.app.service.VoucherTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/games/voucher-transactions")
public class VoucherTransactionController {

    @Autowired
    private VoucherTransactionService service;

    @PostMapping("/create")
    public ResponseEntity<VoucherTransaction> createTransaction(@RequestBody VoucherTransaction transaction) {
        VoucherTransaction createdTransaction = service.createTransaction(transaction);
        return ResponseEntity.ok(createdTransaction);
    }

    @GetMapping("/all")
    public ResponseEntity<List<VoucherTransaction>> getAllTransactions() {
        return ResponseEntity.ok(service.getAllTransactions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VoucherTransaction> getTransactionById(@PathVariable Long id) {
        Optional<VoucherTransaction> transaction = service.getTransactionById(id);
        return transaction.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<VoucherTransaction> updateTransaction(
            @PathVariable Long id, @RequestBody VoucherTransaction transactionDetails) {
        VoucherTransaction updatedTransaction = service.updateTransaction(id, transactionDetails);
        if (updatedTransaction != null) {
            return ResponseEntity.ok(updatedTransaction);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        service.deleteTransaction(id);
        return ResponseEntity.noContent().build();
    }
}

