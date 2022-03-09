package br.com.konatus.teste.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.konatus.teste.domain.Maintenance;
import br.com.konatus.teste.domain.dto.MaintenanceDTO;

@Repository
public interface MaintenanceRepository extends JpaRepository<Maintenance, Long> {

    @Query("select new br.com.konatus.teste.domain.dto.MaintenanceDTO(m.description, "
    + "m.status, m.createdAt) from Maintenance m")
    Page<MaintenanceDTO> getData(Pageable pageable);
}
