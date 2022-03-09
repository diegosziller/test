package br.com.konatus.teste.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.konatus.teste.domain.Stage;
import br.com.konatus.teste.domain.dto.CreateStageDTO;
import br.com.konatus.teste.service.MaintenanceService;
import br.com.konatus.teste.service.StageService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class StageController {

    private final StageService stageService;
    private final MaintenanceService maintenanceService;
    
    @GetMapping("/maintenance/{id}/stages")
    public ResponseEntity<List<Stage>> getStagesByMaintenanceId(@PathVariable Long id) {
        List<Stage> stage = stageService.findByMaintenanceId(id);
        return ResponseEntity.ok().body(stage);
    }

    @PostMapping("/maintenance/{maintenanceId}/stages")
    public ResponseEntity<Stage> createStageByMaintenanceId(@PathVariable Long maintenanceId, @Valid @RequestBody CreateStageDTO stageDTO) 
            throws URISyntaxException {
        maintenanceService.validate(maintenanceId);
        Stage stage = stageService.createStage(maintenanceId, stageDTO);
        return ResponseEntity.created(new URI("/api/stages/" + stage.getId())).body(stage);
    }

    @GetMapping("/maintenance/{maintenanceId}/stages/type")
    public ResponseEntity<Integer> getStageType(@PathVariable Long maintenanceId) {
        Integer stageType = stageService.getStageType(maintenanceId);
        return ResponseEntity.ok().body(stageType);
    }
}
