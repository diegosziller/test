package br.com.konatus.teste.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.konatus.teste.domain.Maintenance;
import br.com.konatus.teste.domain.Stage;
import br.com.konatus.teste.domain.dto.CreateStageDTO;
import br.com.konatus.teste.domain.enums.StageType;
import br.com.konatus.teste.domain.exception.StageException;
import br.com.konatus.teste.repository.StageRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class StageService {

    private final StageRepository stageRepository;

    @Transactional(readOnly = true)
    public Optional<Stage> findOne(Long id) {
        return stageRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Stage> findByMaintenanceId(Long id) {
        return stageRepository.findByMaintenanceId(id);
    }

    public Stage save(Stage stage) {
        return stageRepository.save(stage);
    }

    public Stage createStage(Long maintenanceId, CreateStageDTO stageDTO) {
        Integer maxValue = stageRepository.findTypeByMaintenanceId(maintenanceId);

        Stage stage = new Stage();
        stage.setValue(stageDTO.getValue());
        stage.setMaintenance(new Maintenance(maintenanceId));

        if (maxValue == null) {
            stage.setType(StageType.TEXT);
        } else {
            maxValue+=1;
            switch (maxValue) {
                case 1:
                    stage.setType(StageType.NUMBER);
                    break;
                case 2:
                    stage.setType(StageType.PHOTO);
                    break;
                default:
                    throw new StageException("A etapa não pode ser criada");
            }
        }
        int etapaNumber = stage.getType().ordinal() + 1;

        stage.setDescription("Etapa " + etapaNumber);

        return save(stage);
    }

    public Integer getStageType(Long maintenanceId) {
        return stageRepository.findTypeByMaintenanceId(maintenanceId);
    }
}