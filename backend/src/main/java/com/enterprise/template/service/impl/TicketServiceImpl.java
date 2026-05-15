package com.enterprise.template.service.impl;

import com.enterprise.template.dto.TicketDTO;
import com.enterprise.template.entity.Ticket;
import com.enterprise.template.exception.ResourceNotFoundException;
import com.enterprise.template.repository.TicketRepository;
import com.enterprise.template.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;

    @Override
    public TicketDTO createTicket(TicketDTO ticketDTO) {
        Ticket ticket = new Ticket();
        BeanUtils.copyProperties(ticketDTO, ticket, "id", "createdAt", "updatedAt");
        Ticket savedTicket = ticketRepository.save(ticket);
        return convertToDTO(savedTicket);
    }

    @Override
    public TicketDTO updateTicket(Long id, TicketDTO ticketDTO) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with id: " + id));
        
        BeanUtils.copyProperties(ticketDTO, ticket, "id", "createdAt", "updatedAt");
        Ticket updatedTicket = ticketRepository.save(ticket);
        return convertToDTO(updatedTicket);
    }

    @Override
    public TicketDTO getTicketById(Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with id: " + id));
        return convertToDTO(ticket);
    }

    @Override
    public Page<TicketDTO> getAllTickets(Pageable pageable) {
        return ticketRepository.findAll(pageable).map(this::convertToDTO);
    }

    @Override
    public Page<TicketDTO> searchTickets(String searchTerm, Pageable pageable) {
        return ticketRepository.findByFullnameContainingIgnoreCaseOrDepartmentContainingIgnoreCaseOrIssueTitleContainingIgnoreCase(
                searchTerm, searchTerm, searchTerm, pageable).map(this::convertToDTO);
    }

    @Override
    public void deleteTicket(Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with id: " + id));
        ticketRepository.delete(ticket);
    }

    private TicketDTO convertToDTO(Ticket ticket) {
        TicketDTO dto = new TicketDTO();
        BeanUtils.copyProperties(ticket, dto);
        return dto;
    }
}
