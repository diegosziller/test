package br.com.konatus.teste.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.konatus.teste.domain.Maintenance;
import br.com.konatus.teste.domain.User;
import br.com.konatus.teste.domain.dto.CreateMaintenanceDTO;
import br.com.konatus.teste.domain.dto.MaintenanceDTO;
import br.com.konatus.teste.domain.exception.MaintenanceException;
import br.com.konatus.teste.domain.exception.NotFoundException;
import br.com.konatus.teste.repository.MaintenanceRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MaintenanceService {

    private final MaintenanceRepository maintenanceRepository;

    @Transactional(readOnly = true)
    public Page<Maintenance> findAll(Pageable pageable) {
        return maintenanceRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Page<MaintenanceDTO> getData(Pageable pageable) {
        return maintenanceRepository.getData(pageable);
    }

    @Transactional(readOnly = true)
    public Optional<Maintenance> findOne(Long id) {
        return maintenanceRepository.findById(id);
    }

    public Maintenance save(CreateMaintenanceDTO maintenanceDTO) {
        return maintenanceRepository.save(createFromDTO(maintenanceDTO));
    }

    public Maintenance save(Maintenance maintenance) {
        return maintenanceRepository.save(maintenance);
    }

    private Maintenance createFromDTO(CreateMaintenanceDTO maintenanceDTO) {
        Maintenance maintenance = new Maintenance();
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        maintenance.setDescription(maintenanceDTO.getDescription());
        maintenance.setUser(new User(user.getId()));

        return maintenance;
    }

    public Maintenance finalizeMaintenance(Maintenance maintenance) {
        maintenance.setStatus(true);
        return this.save(maintenance);
    }

    public Maintenance validate(Long id) {
        Maintenance maintenance = maintenanceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(Maintenance.class, id));

        if (maintenance.getStatus()) {
            throw new MaintenanceException("Manutenção encontra-se finalizada");
        }

        return maintenance;
    }

}