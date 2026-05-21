package com.quantity.measurement.serviceImpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.quantity.measurement.dto.QuantityDTO;
import com.quantity.measurement.entity.Entity;
import com.quantity.measurement.enumsImpl.LengthUnit;
import com.quantity.measurement.enumsImpl.VolumeUnit;
import com.quantity.measurement.enumsImpl.WeightUnit;
import com.quantity.measurement.enumsImpl.TemperatureUnit;
import com.quantity.measurement.enums.IMeasurable;
import com.quantity.measurement.exception.Exception;
import com.quantity.measurement.model.Quantity;
import com.quantity.measurement.repository.Repository;
import com.quantity.measurement.service.Service;
import jakarta.transaction.Transactional;

@org.springframework.stereotype.Service
public class ServiceImpl implements Service {

    private static final Logger logger = LoggerFactory.getLogger(ServiceImpl.class);

    private final Repository repository;

    // DI using Constructor
    public ServiceImpl(Repository repository2) {
        this.repository = repository2;

        logger.info("QuantityMeasurementService initialized");

    }

    private IMeasurable getUnit(String unit, String type) {

        String normalizedUnit = normalizeUnit(unit);
        String normalizedType = normalizeMeasurementType(type);

        logger.debug("Resolving unit {} for type {}", normalizedUnit, normalizedType);

        return switch (normalizedType) {
            case "LENGTH" -> LengthUnit.valueOf(normalizedUnit);
            case "WEIGHT" -> WeightUnit.valueOf(normalizedUnit);
            case "VOLUME" -> VolumeUnit.valueOf(normalizedUnit);
            case "TEMPERATURE" -> TemperatureUnit.valueOf(normalizedUnit);
            default -> throw new Exception("Invalid type");
        };
    }

    private String normalizeMeasurementType(String type) {
        if (type == null || type.isBlank()) {
            throw new Exception("Measurement type is required");
        }

        return switch (type.trim().toUpperCase()) {
            case "LENGTH", "LENGTH_UNIT", "LENGTHUNIT" -> "LENGTH";
            case "WEIGHT", "WEIGHT_UNIT", "WEIGHTUNIT" -> "WEIGHT";
            case "VOLUME", "VOLUME_UNIT", "VOLUMEUNIT" -> "VOLUME";
            case "TEMPERATURE", "TEMPERATURE_UNIT", "TEMPERATUREUNIT" -> "TEMPERATURE";
            default -> throw new Exception("Invalid type");
        };
    }

    private String normalizeUnit(String unit) {
        if (unit == null || unit.isBlank()) {
            throw new Exception("Unit is required");
        }

        String normalized = unit.trim().toUpperCase();
        return switch (normalized) {
            case "INCHES" -> "INCH";
            case "YARD" -> "YARDS";
            case "CENTIMETER" -> "CENTIMETERS";
            case "LITER" -> "LITRE";
            case "MILLILITER" -> "MILLILITRE";
            default -> normalized;
        };
    }

    @Override
    @Transactional
    public QuantityDTO add(QuantityDTO q1, QuantityDTO q2, String targetUnit) {

        logger.info("ADD operation started");

        try {

            IMeasurable u1 = getUnit(q1.getUnit(), q1.getMeasurementType());

            IMeasurable u2 = getUnit(q2.getUnit(), q2.getMeasurementType());

            Quantity<?> result = new Quantity<>(q1.getValue(), u1).add(new Quantity<>(q2.getValue(), u2),
                    getUnit(targetUnit, q1.getMeasurementType()));

            logger.info("ADD operation successful");

            return new QuantityDTO(result.getValue(), targetUnit, q1.getMeasurementType());

        } catch (java.lang.Exception e) {

            logger.error("ADD operation failed", e);

            return new QuantityDTO(true, e.getMessage());
        }
    }

    @Override
    @Transactional
    public QuantityDTO subtract(QuantityDTO q1, QuantityDTO q2, String targetUnit) {

        logger.info("SUBTRACT operation started");

        try {

            IMeasurable u1 = getUnit(q1.getUnit(), q1.getMeasurementType());

            IMeasurable u2 = getUnit(q2.getUnit(), q2.getMeasurementType());

            Quantity<?> result = new Quantity<>(q1.getValue(), u1)
                    .subtract(
                            new Quantity<>(q2.getValue(), u2),
                            getUnit(targetUnit, q1.getMeasurementType()));

            logger.info("SUBTRACT operation successful");

            return new QuantityDTO(result.getValue(), targetUnit, q1.getMeasurementType());

        } catch (java.lang.Exception e) {

            logger.error("SUBTRACT operation failed", e);

            return new QuantityDTO(true, e.getMessage());
        }
    }

    @Override
    @Transactional
    public QuantityDTO multiply(QuantityDTO q1, QuantityDTO q2, String targetUnit) {

        logger.info("MULTIPLY operation started");

        try {

            IMeasurable u1 = getUnit(q1.getUnit(), q1.getMeasurementType());

            IMeasurable u2 = getUnit(q2.getUnit(), q2.getMeasurementType());

            Quantity<?> result = new Quantity<>(q1.getValue(), u1)
                    .multiply(
                            new Quantity<>(q2.getValue(), u2),
                            getUnit(targetUnit, q1.getMeasurementType()));

            logger.info("MULTIPLY operation successful");

            return new QuantityDTO(result.getValue(), targetUnit, q1.getMeasurementType());

        } catch (java.lang.Exception e) {

            logger.error("MULTIPLY operation failed", e);

            return new QuantityDTO(true, e.getMessage());
        }
    }

    @Override
    @Transactional
    public QuantityDTO divide(QuantityDTO q1, QuantityDTO q2) {

        logger.info("DIVIDE operation started");

        try {

            IMeasurable u1 = getUnit(q1.getUnit(), q1.getMeasurementType());

            IMeasurable u2 = getUnit(q2.getUnit(), q2.getMeasurementType());

            double result = new Quantity<>(q1.getValue(), u1)
                    .divide(new Quantity<>(q2.getValue(), u2));

            logger.info("DIVIDE operation successful");

            return new QuantityDTO(result, "SCALAR", q1.getMeasurementType());

        } catch (java.lang.Exception e) {

            logger.error("DIVIDE operation failed", e);

            return new QuantityDTO(true, e.getMessage());
        }
    }

    @Override
    @Transactional
    public QuantityDTO percentage(QuantityDTO q1, QuantityDTO q2) {

        logger.info("PERCENTAGE operation started");

        try {

            IMeasurable u1 = getUnit(q1.getUnit(), q1.getMeasurementType());

            IMeasurable u2 = getUnit(q2.getUnit(), q2.getMeasurementType());

            double divisor = new Quantity<>(q2.getValue(), u2).toConvert(u1).getValue();

            if (Math.abs(divisor) < 1e-6) {
                throw new ArithmeticException("Division by zero");
            }

            double result = (q1.getValue() / divisor) * 100.0;

            logger.info("PERCENTAGE operation successful");

            return new QuantityDTO(result, "PERCENT", q1.getMeasurementType());

        } catch (java.lang.Exception e) {

            logger.error("PERCENTAGE operation failed", e);

            return new QuantityDTO(true, e.getMessage());
        }
    }

    @Override
    @Transactional
    public QuantityDTO convert(QuantityDTO q, String targetUnit) {

        logger.info("CONVERT operation started");

        try {
            IMeasurable u = getUnit(q.getUnit(), q.getMeasurementType());

            Quantity<?> result = new Quantity<>(q.getValue(), u)
                    .toConvert(getUnit(targetUnit, q.getMeasurementType()));

            logger.info("CONVERT operation successful");

            return new QuantityDTO(result.getValue(), targetUnit, q.getMeasurementType());

        } catch (java.lang.Exception e) {

            logger.error("CONVERT operation failed : {}", e.getMessage());

            return new QuantityDTO(true, e.getMessage());
        }
    }

    @Override
    @Transactional
    public QuantityDTO compare(QuantityDTO q1, QuantityDTO q2) {

        logger.info("COMPARE operation started");

        try {
            IMeasurable u1 = getUnit(q1.getUnit(), q1.getMeasurementType());
            IMeasurable u2 = getUnit(q2.getUnit(), q2.getMeasurementType());

            if (!u1.getClass().equals(u2.getClass())) {
                throw new IllegalArgumentException("Different measurement types");
            }

            boolean result = new Quantity<>(q1.getValue(), u1)
                    .equals(new Quantity<>(q2.getValue(), u2));

            logger.info("COMPARE operation successful");

            return new QuantityDTO(result ? 1 : 0, "BOOLEAN", q1.getMeasurementType());

        } catch (java.lang.Exception e) {

            logger.error("COMPARE operation failed : {}", e.getMessage());

            return new QuantityDTO(true, e.getMessage());
        }
    }
}
