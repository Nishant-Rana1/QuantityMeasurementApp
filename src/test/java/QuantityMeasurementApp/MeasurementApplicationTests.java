package QuantityMeasurementApp;

import com.quantity.measurement.enums.LengthUnit;
import com.quantity.measurement.model.QuantityLength;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MeasurementApplicationTests {

	// 1 (Feet → Inches)
	@Test
	void testConversion_FeetToInches() {
		assertEquals(12.0,
				QuantityLength.convert(1.0, LengthUnit.FEET, LengthUnit.INCH));
	}

	// 2 (Inches → Feet)
	@Test
	void testConversion_InchesToFeet() {
		assertEquals(2.0,
				QuantityLength.convert(24.0, LengthUnit.INCH, LengthUnit.FEET));
	}

	// 3 (Yards → Inches)
	@Test
	void testConversion_YardsToInches() {
		assertEquals(36.0,
				QuantityLength.convert(1.0, LengthUnit.YARDS, LengthUnit.INCH));
	}

	// 4 (Inches → Yards)
	@Test
	void testConversion_InchesToYards() {
		assertEquals(2.0,
				QuantityLength.convert(72.0, LengthUnit.INCH, LengthUnit.YARDS));
	}

	// 5 (Centimeters → Inches with precision)
	@Test
	void testConversion_CentimetersToInches() {
		assertEquals(1.0,
				QuantityLength.convert(2.54, LengthUnit.CENTIMETERS, LengthUnit.INCH),
				1e-6);
	}

	// 6 (Feet → Yards)
	@Test
	void testConversion_FeetToYards() {
		assertEquals(2.0,
				QuantityLength.convert(6.0, LengthUnit.FEET, LengthUnit.YARDS));
	}

	// 7 (Zero value)
	@Test
	void testConversion_ZeroValue() {
		assertEquals(0.0,
				QuantityLength.convert(0.0, LengthUnit.FEET, LengthUnit.INCH));
	}

	// 8 (Negative value)
	@Test
	void testConversion_NegativeValue() {
		assertEquals(-12.0,
				QuantityLength.convert(-1.0, LengthUnit.FEET, LengthUnit.INCH));
	}

	// 9 (Round-trip conversion)
	@Test
	void testConversion_RoundTrip() {
		double original = 5.0;

		double converted = QuantityLength.convert(original, LengthUnit.FEET, LengthUnit.INCH);
		double back = QuantityLength.convert(converted, LengthUnit.INCH, LengthUnit.FEET);

		assertEquals(original, back, 1e-6);
	}

	// 10 (Invalid unit → null)
	@Test
	void testConversion_InvalidUnit_Throws() {
		assertThrows(IllegalArgumentException.class, () ->
				QuantityLength.convert(1.0, null, LengthUnit.FEET));
	}

	// 11 (NaN or Infinite values)
	@Test
	void testConversion_NaNOrInfinite_Throws() {
		assertThrows(IllegalArgumentException.class, () ->
				QuantityLength.convert(Double.NaN, LengthUnit.FEET, LengthUnit.INCH));

		assertThrows(IllegalArgumentException.class, () ->
				QuantityLength.convert(Double.POSITIVE_INFINITY, LengthUnit.FEET, LengthUnit.INCH));
	}

	// 12 (Precision tolerance across multiple conversions)
	@Test
	void testConversion_PrecisionTolerance() {
		double result = QuantityLength.convert(1.0, LengthUnit.CENTIMETERS, LengthUnit.FEET);
		double expected = 0.0328084;

		assertEquals(expected, result, 1e-6);
	}
}