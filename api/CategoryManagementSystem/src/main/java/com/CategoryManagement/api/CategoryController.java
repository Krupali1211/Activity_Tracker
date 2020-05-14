package com.CategoryManagement.api;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CategoryManagement.model.Category;
import com.CategoryManagement.service.CategoryService;


@CrossOrigin
@RestController
@RequestMapping("Category")
public class CategoryController {
	@Autowired
	CategoryService categoryService;
	
	@PostMapping("/addCategory")
	public void addCategory(@RequestBody Category category) {
		categoryService.addCategory(category);
	}
	
	@PutMapping(value = "/updateCategory/{id}")
	public void updateCategory(@RequestBody Category category,@PathVariable int id) {
		categoryService.updateCategory(category, id);
	}
	
	@GetMapping(value = "/getAllCategories", produces = MediaType.APPLICATION_JSON_VALUE )
	public List<Category> getAllCategories(){
		return categoryService.getAllCategories();
	}
	
	@GetMapping(value = "/searchCategory/{id}", produces = MediaType.APPLICATION_JSON_VALUE )
	public Optional<Category> searchCategory(@PathVariable int id){
		return categoryService.searchCategory(id);
	}
	
	@DeleteMapping("/deleteCategory/{id}")
	public void deleteCategory(@PathVariable("id") int userId) {
		categoryService.deleteCategory(userId);
	}

}
