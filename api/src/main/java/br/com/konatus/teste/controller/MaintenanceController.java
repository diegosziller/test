package br.com.konatus.teste.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.konatus.teste.domain.Maintenance;
import br.com.konatus.teste.domain.dto.CreateMaintenanceDTO;
import br.com.konatus.teste.domain.dto.MaintenanceDTO;
import br.com.konatus.teste.domain.exception.NotFoundException;
import br.com.konatus.teste.service.MaintenanceService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MaintenanceController {

    private final MaintenanceService maintenanceService;

    @GetMapping("/maintenances")
    public ResponseEntity<List<Maintenance>> getAllMaintenances(Pageable pageable) {
        Page<Maintenance> page = maintenanceService.findAll(pageable);
        return ResponseEntity.ok()
                            .header("X-Total-Count", Long.toString(page.getTotalElements()))
                            .body(page.getContent());
    }

    @GetMapping("/maintenances/data")
    public ResponseEntity<List<MaintenanceDTO>> getData(Pageable pageable) {
        Page<MaintenanceDTO> page = maintenanceService.getData(pageable);
        return ResponseEntity.ok()
                            .header("X-Total-Count", Long.toString(page.getTotalElements()))
                            .body(page.getContent());
    }

    @GetMapping("/maintenances/{id}")
    public ResponseEntity<Maintenance> getMaintenance(@PathVariable Long id) {
        Maintenance maintenance = maintenanceService.findOne(id)
                .orElseThrow(() -> new NotFoundException(Maintenance.class, id));
        return ResponseEntity.ok().body(maintenance);
    }

    @PostMapping("/maintenances")
    public ResponseEntity<Maintenance> createMaintenance(@Valid @RequestBody CreateMaintenanceDTO maintenanceDTO)
            throws URISyntaxException {

        Maintenance maintenance = maintenanceService.save(maintenanceDTO);
        return ResponseEntity.created(new URI("/api/maintenances/" + maintenance.getId())).body(maintenance);
    }

    @PutMapping("/maintenances/{id}/finalize")
    public ResponseEntity<Maintenance> finalizeMaintenance(@PathVariable Long id) {
        Maintenance maintenance = maintenanceService.validate(id);
        Maintenance updatedMaintenance = maintenanceService.finalizeMaintenance(maintenance);

        return ResponseEntity.ok().body(updatedMaintenance);
    }

}
