package com.CategoryManagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CategoryManagement.dao.CategoryRepository;
import com.CategoryManagement.model.Category;

@Service
public class CategoryService {
	@Autowired
	CategoryRepository categoryRepository;
	
	//-------------------------Add Category----------------------------------------------------
		public void addCategory(Category category) {
			categoryRepository.save(category);
		}
	//-------------------------Edit Category----------------------------------------------------
		public void updateCategory(Category category,int id) {
			Category newCategory = categoryRepository.getOne(id);
			
			newCategory.setCat_name(category.getCat_name());
			newCategory.setCat_description(category.getCat_description());
			
			categoryRepository.save(newCategory);
		}
		//--------------------List of All Categories-----------------------------------------------
		public List<Category> getAllCategories(){
			return categoryRepository.findAll();
		}
		//--------------------Search Category-----------------------------------------------
		public Optional<Category> searchCategory(int id){
			return categoryRepository.findById(id);
		}
		
		/**
		 * delete category by id
		 * @param id
		 */
		public void deleteCategory(int id) {
			categoryRepository.deleteById(id);
		}
		
}
