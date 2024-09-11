package com.vou.app.repository;

import com.vou.app.model.VoucherTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VoucherTransactionRepository extends JpaRepository<VoucherTransaction, Long> {
    // Custom query methods if needed
    Optional<VoucherTransaction> findByUserIdAndVoucherId(Long userId, Long voucherId);

    List<VoucherTransaction> findByVoucherId(Long voucherId);

    List<VoucherTransaction> findByUserId(Long userId);
}
