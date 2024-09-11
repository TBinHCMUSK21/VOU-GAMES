package com.vou.app.service;

import com.vou.app.model.VoucherTransaction;
import com.vou.app.repository.VoucherTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoucherTransactionService {

    @Autowired
    private VoucherTransactionRepository repository;

    public VoucherTransaction createTransaction(VoucherTransaction transaction) {
        // check if voucher transaction already exists
        Optional<VoucherTransaction> existingTransaction = repository.findByUserIdAndVoucherId(transaction.getUserId(), transaction.getVoucherId());
        if (existingTransaction.isPresent()) {
            VoucherTransaction existing = existingTransaction.get();
            existing.setQuantity(existing.getQuantity() + transaction.getQuantity());
            return repository.save(existing);
        }
        return repository.save(transaction);
    }

    public List<VoucherTransaction> getAllTransactions() {
        return repository.findAll();
    }

    public Optional<VoucherTransaction> getTransactionById(Long id) {
        return repository.findById(id);
    }

    public VoucherTransaction updateTransaction(Long id, VoucherTransaction transactionDetails) {
        Optional<VoucherTransaction> existingTransaction = repository.findById(id);
        if (existingTransaction.isPresent()) {
            VoucherTransaction transaction = existingTransaction.get();
            transaction.setQuantity(transactionDetails.getQuantity());
            transaction.setUsedQuantity(transactionDetails.getUsedQuantity());
            // Other fields can also be updated
            return repository.save(transaction);
        }
        return null;
    }

    public void deleteTransaction(Long id) {
        repository.deleteById(id);
    }

    // get all transactions by voucher id
    public List<VoucherTransaction> getTransactionsByVoucherId(Long voucherId) {
        return repository.findByVoucherId(voucherId);
    }

    // get all transactions by user id
    public List<VoucherTransaction> getTransactionsByUserId(Long userId) {
        return repository.findByUserId(userId);
    }
}

