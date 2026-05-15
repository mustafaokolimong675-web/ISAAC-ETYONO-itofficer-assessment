package com.enterprise.template.service.impl;

import com.enterprise.template.dto.ItemDTO;
import com.enterprise.template.entity.GenericItem;
import com.enterprise.template.exception.ResourceNotFoundException;
import com.enterprise.template.repository.ItemRepository;
import com.enterprise.template.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    @Autowired
    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    @Transactional
    public ItemDTO createItem(ItemDTO itemDTO) {
        GenericItem item = new GenericItem();
        item.setName(itemDTO.getName());
        item.setDescription(itemDTO.getDescription());
        item.setCategory(itemDTO.getCategory());
        item.setPrice(itemDTO.getPrice());
        item.setQuantity(itemDTO.getQuantity());
        item.setStatus(itemDTO.getStatus());
        
        GenericItem savedItem = itemRepository.save(item);
        return convertToDTO(savedItem);
    }

    @Override
    @Transactional
    public ItemDTO updateItem(Long id, ItemDTO itemDTO) {
        GenericItem existingItem = itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found with id: " + id));
        
        existingItem.setName(itemDTO.getName());
        existingItem.setDescription(itemDTO.getDescription());
        existingItem.setCategory(itemDTO.getCategory());
        existingItem.setPrice(itemDTO.getPrice());
        existingItem.setQuantity(itemDTO.getQuantity());
        existingItem.setStatus(itemDTO.getStatus());
        
        GenericItem updatedItem = itemRepository.save(existingItem);
        return convertToDTO(updatedItem);
    }

    @Override
    public ItemDTO getItemById(Long id) {
        GenericItem item = itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found with id: " + id));
        return convertToDTO(item);
    }

    @Override
    public Page<ItemDTO> getAllItems(Pageable pageable) {
        return itemRepository.findAll(pageable).map(this::convertToDTO);
    }

    @Override
    public Page<ItemDTO> searchItems(String searchTerm, Pageable pageable) {
        return itemRepository.findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                searchTerm, searchTerm, searchTerm, pageable).map(this::convertToDTO);
    }

    @Override
    @Transactional
    public void deleteItem(Long id) {
        if (!itemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Item not found with id: " + id);
        }
        itemRepository.deleteById(id);
    }

    private ItemDTO convertToDTO(GenericItem item) {
        ItemDTO dto = new ItemDTO();
        dto.setId(item.getId());
        dto.setName(item.getName());
        dto.setDescription(item.getDescription());
        dto.setCategory(item.getCategory());
        dto.setPrice(item.getPrice());
        dto.setQuantity(item.getQuantity());
        dto.setStatus(item.getStatus());
        return dto;
    }
}
