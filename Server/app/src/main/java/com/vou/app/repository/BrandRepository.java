package com.vou.app.repository;

import com.vou.app.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BrandRepository extends JpaRepository<Brand, Long> {
    Brand findByName(String name);
}
