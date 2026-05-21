import { Gauge, Ruler, Scale, Thermometer, Droplets } from "lucide-react";

export const UNIT_CATEGORIES = {
  LENGTH: {
    label: "Length",
    eyebrow: "MEASURE",
    icon: Ruler,
    units: [
      { value: "FEET", label: "Feet (ft)" },
      { value: "INCH", label: "Inch (in)" },
      { value: "YARDS", label: "Yards (yd)" },
      { value: "CENTIMETERS", label: "Centimeters (cm)" },
    ],
  },
  WEIGHT: {
    label: "Weight",
    eyebrow: "MASS",
    icon: Scale,
    units: [
      { value: "KILOGRAM", label: "Kilogram (kg)" },
      { value: "GRAM", label: "Gram (g)" },
      { value: "POUND", label: "Pound (lb)" },
    ],
  },
  VOLUME: {
    label: "Volume",
    eyebrow: "CAPACITY",
    icon: Droplets,
    units: [
      { value: "LITRE", label: "Litre (L)" },
      { value: "MILLILITRE", label: "Millilitre (ml)" },
      { value: "GALLON", label: "Gallon (gal)" },
    ],
  },
  TEMPERATURE: {
    label: "Temperature",
    eyebrow: "CLIMATE",
    icon: Thermometer,
    units: [
      { value: "CELSIUS", label: "Celsius (C)" },
      { value: "FAHRENHEIT", label: "Fahrenheit (F)" },
      { value: "KELVIN", label: "Kelvin (K)" },
    ],
  },
};

export const categoryOptions = Object.entries(UNIT_CATEGORIES).map(([value, item]) => ({
  value,
  label: item.label,
}));

export function defaultUnit(category, index = 0) {
  return UNIT_CATEGORIES[category].units[index]?.value || UNIT_CATEGORIES[category].units[0].value;
}

export function unitLabel(value) {
  for (const category of Object.values(UNIT_CATEGORIES)) {
    const unit = category.units.find((item) => item.value === value);
    if (unit) return unit.label;
  }
  return value;
}

export function buildInputPayload({ category, fromValue, fromUnit, toValue = 0, toUnit, targetUnit }) {
  return {
    thisQuantityDTO: {
      value: Number(fromValue),
      unit: fromUnit,
      measurementType: category,
    },
    thatQuantityDTO: {
      value: Number(toValue),
      unit: toUnit,
      measurementType: category,
    },
    targetUnit: targetUnit || toUnit,
  };
}

export const metricIcon = Gauge;
