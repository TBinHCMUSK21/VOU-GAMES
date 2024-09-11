package com.vou.app.repository;

import com.vou.app.entity.Brands;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BrandRepository extends JpaRepository<Brands, Long> {
    Brands findByName(String name);
}
