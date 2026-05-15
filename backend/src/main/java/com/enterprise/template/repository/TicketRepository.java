package com.enterprise.template.repository;

import com.enterprise.template.entity.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    
    Page<Ticket> findByFullnameContainingIgnoreCaseOrDepartmentContainingIgnoreCaseOrIssueTitleContainingIgnoreCase(
            String fullname, String department, String issueTitle, Pageable pageable);
}
