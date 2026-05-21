package com.quantity.measurement.controller;

import com.quantity.measurement.dto.QuantityDTO;
import com.quantity.measurement.dto.QuantityInputDTO;
import com.quantity.measurement.service.Service;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/quantities")
public class QuantityMeasurementController {

    private final Service service;

    public QuantityMeasurementController(Service service) {
        this.service = service;
    }

    @PostMapping("/compare")
    public ResponseEntity<QuantityDTO> compare(@Valid @RequestBody QuantityInputDTO input) {
        QuantityDTO result = service.compare(input.getThisQuantityDTO(), input.getThatQuantityDTO());
        return response(result);
    }

    @PostMapping("/convert")
    public ResponseEntity<QuantityDTO> convert(@Valid @RequestBody QuantityInputDTO input) {
        String targetUnit = input.getTargetUnit() != null
                ? input.getTargetUnit()
                : input.getThatQuantityDTO().getUnit();
        QuantityDTO result = service.convert(input.getThisQuantityDTO(), targetUnit);
        return response(result);
    }

    @PostMapping("/add")
    public ResponseEntity<QuantityDTO> add(@Valid @RequestBody QuantityInputDTO input) {
        QuantityDTO result = service.add(
                input.getThisQuantityDTO(),
                input.getThatQuantityDTO(),
                resolveTargetUnit(input)
        );
        return response(result);
    }

    @PostMapping("/subtract")
    public ResponseEntity<QuantityDTO> subtract(@Valid @RequestBody QuantityInputDTO input) {
        QuantityDTO result = service.subtract(
                input.getThisQuantityDTO(),
                input.getThatQuantityDTO(),
                resolveTargetUnit(input)
        );
        return response(result);
    }

    @PostMapping("/multiply")
    public ResponseEntity<QuantityDTO> multiply(@Valid @RequestBody QuantityInputDTO input) {
        QuantityDTO result = service.multiply(
                input.getThisQuantityDTO(),
                input.getThatQuantityDTO(),
                resolveTargetUnit(input)
        );
        return response(result);
    }

    @PostMapping("/divide")
    public ResponseEntity<QuantityDTO> divide(@Valid @RequestBody QuantityInputDTO input) {
        QuantityDTO result = service.divide(input.getThisQuantityDTO(), input.getThatQuantityDTO());
        return response(result);
    }

    @PostMapping("/percentage")
    public ResponseEntity<QuantityDTO> percentage(@Valid @RequestBody QuantityInputDTO input) {
        QuantityDTO result = service.percentage(input.getThisQuantityDTO(), input.getThatQuantityDTO());
        return response(result);
    }

    private ResponseEntity<QuantityDTO> response(QuantityDTO result) {
        if (result.isError()) {
            throw new com.quantity.measurement.exception.Exception(result.getErrorMessage());
        }
        return ResponseEntity.ok(result);
    }

    private String resolveTargetUnit(QuantityInputDTO input) {
        if (input.getTargetUnit() != null && !input.getTargetUnit().isBlank()) {
            return input.getTargetUnit();
        }
        return input.getThisQuantityDTO().getUnit();
    }
}
