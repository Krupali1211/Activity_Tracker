package com.CategoryManagement.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.CategoryManagement.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
