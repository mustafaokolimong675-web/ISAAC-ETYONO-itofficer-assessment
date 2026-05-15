package com.enterprise.template.service;

import com.enterprise.template.dto.ItemDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ItemService {
    ItemDTO createItem(ItemDTO itemDTO);
    ItemDTO updateItem(Long id, ItemDTO itemDTO);
    ItemDTO getItemById(Long id);
    Page<ItemDTO> getAllItems(Pageable pageable);
    Page<ItemDTO> searchItems(String searchTerm, Pageable pageable);
    void deleteItem(Long id);
}
