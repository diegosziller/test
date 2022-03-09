package br.com.konatus.teste.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.konatus.teste.domain.Stage;

public interface StageRepository extends JpaRepository<Stage, Long> {

    List<Stage> findByMaintenanceId(Long maintenanceId);

    @Query("select max(type) from Stage s where s.maintenance.id = ?1")
    Integer findTypeByMaintenanceId(Long maintenanceId);

}
