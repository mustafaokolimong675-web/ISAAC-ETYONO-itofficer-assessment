package com.enterprise.template.service.impl;

import com.enterprise.template.dto.TicketDTO;
import com.enterprise.template.entity.Ticket;
import com.enterprise.template.exception.TicketNotFoundException;
import com.enterprise.template.repository.TicketRepository;
import com.enterprise.template.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;

    @Override
    public TicketDTO createTicket(TicketDTO ticketDTO) {
        Ticket ticket = new Ticket();
        ticket.setFullname(ticketDTO.getFullname());
        ticket.setEmail(ticketDTO.getEmail());
        ticket.setDepartment(ticketDTO.getDepartment());
        ticket.setIssueTitle(ticketDTO.getIssueTitle());
        ticket.setIssueDescription(ticketDTO.getIssueDescription());
        ticket.setPriority(ticketDTO.getPriority() != null ? ticketDTO.getPriority() : "Low");
        ticket.setStatus(ticketDTO.getStatus() != null ? ticketDTO.getStatus() : "OPEN");

        Ticket savedTicket = ticketRepository.save(ticket);
        return convertToDTO(savedTicket);
    }

    @Override
    public TicketDTO updateTicket(Long id, TicketDTO ticketDTO) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new TicketNotFoundException("Ticket not found with id: " + id));

        ticket.setFullname(ticketDTO.getFullname());
        ticket.setEmail(ticketDTO.getEmail());
        ticket.setDepartment(ticketDTO.getDepartment());
        ticket.setIssueTitle(ticketDTO.getIssueTitle());
        ticket.setIssueDescription(ticketDTO.getIssueDescription());
        ticket.setPriority(ticketDTO.getPriority());
        ticket.setStatus(ticketDTO.getStatus());

        Ticket updatedTicket = ticketRepository.save(ticket);
        return convertToDTO(updatedTicket);
    }

    @Override
    @Transactional(readOnly = true)
    public TicketDTO getTicketById(Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new TicketNotFoundException("Ticket not found with id: " + id));
        return convertToDTO(ticket);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TicketDTO> getAllTickets(Pageable pageable) {
        Page<Ticket> tickets = ticketRepository.findAll(pageable);
        List<TicketDTO> dtoList = tickets.getContent()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return new PageImpl<>(dtoList, pageable, tickets.getTotalElements());
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TicketDTO> searchTickets(String searchTerm, Pageable pageable) {
        Page<Ticket> tickets = ticketRepository
                .findByFullnameContainingIgnoreCaseOrDepartmentContainingIgnoreCaseOrIssueTitleContainingIgnoreCase(
                        searchTerm, searchTerm, searchTerm, pageable);
        List<TicketDTO> dtoList = tickets.getContent()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return new PageImpl<>(dtoList, pageable, tickets.getTotalElements());
    }

    @Override
    public void deleteTicket(Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new TicketNotFoundException("Ticket not found with id: " + id));
        ticketRepository.delete(ticket);
    }

    private TicketDTO convertToDTO(Ticket ticket) {
        TicketDTO dto = new TicketDTO();
        dto.setId(ticket.getId());
        dto.setFullname(ticket.getFullname());
        dto.setEmail(ticket.getEmail());
        dto.setDepartment(ticket.getDepartment());
        dto.setIssueTitle(ticket.getIssueTitle());
        dto.setIssueDescription(ticket.getIssueDescription());
        dto.setPriority(ticket.getPriority());
        dto.setStatus(ticket.getStatus());
        dto.setCreatedAt(ticket.getCreatedAt());
        dto.setUpdatedAt(ticket.getUpdatedAt());
        return dto;
    }
}
