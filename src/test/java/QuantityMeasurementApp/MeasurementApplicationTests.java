package QuantityMeasurementApp;

import com.quantity.measurement.enums.LengthUnit;
import com.quantity.measurement.model.QuantityLength;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MeasurementApplicationTests {
		// 1 (Feet + Feet)
		@Test
		void testAddition_FeetPlusFeet() {
			assertEquals(
					new QuantityLength(3.0, LengthUnit.FEET),
					QuantityLength.add(
							new QuantityLength(1.0, LengthUnit.FEET),
							new QuantityLength(2.0, LengthUnit.FEET)
					)
			);
		}

		// 2 (Feet + Inches → Feet)
		@Test
		void testAddition_FeetPlusInches() {
			assertEquals(
					new QuantityLength(2.0, LengthUnit.FEET),
					QuantityLength.add(
							new QuantityLength(1.0, LengthUnit.FEET),
							new QuantityLength(12.0, LengthUnit.INCH)
					)
			);
		}

		// 3 (Inches + Feet → Inches)
		@Test
		void testAddition_InchesPlusFeet() {
			assertEquals(
					new QuantityLength(24.0, LengthUnit.INCH),
					QuantityLength.add(
							new QuantityLength(12.0, LengthUnit.INCH),
							new QuantityLength(1.0, LengthUnit.FEET)
					)
			);
		}

		// 4 (Yards + Feet → Yards)
		@Test
		void testAddition_YardsPlusFeet() {
			assertEquals(
					new QuantityLength(2.0, LengthUnit.YARDS),
					QuantityLength.add(
							new QuantityLength(1.0, LengthUnit.YARDS),
							new QuantityLength(3.0, LengthUnit.FEET)
					)
			);
		}

		// 5 (Inches + Yards → Inches)
		@Test
		void testAddition_InchesPlusYards() {
			assertEquals(
					new QuantityLength(72.0, LengthUnit.INCH),
					QuantityLength.add(
							new QuantityLength(36.0, LengthUnit.INCH),
							new QuantityLength(1.0, LengthUnit.YARDS)
					)
			);
		}

		// 6 (CM + Inches → CM with precision)
		@Test
		void testAddition_CentimetersPlusInches() {
			assertEquals(
					new QuantityLength(5.08, LengthUnit.CENTIMETERS),
					QuantityLength.add(
							new QuantityLength(2.54, LengthUnit.CENTIMETERS),
							new QuantityLength(1.0, LengthUnit.INCH)
					)
			);
		}

		// 7 (Identity: +0)
		@Test
		void testAddition_WithZero() {
			assertEquals(
					new QuantityLength(5.0, LengthUnit.FEET),
					QuantityLength.add(
							new QuantityLength(5.0, LengthUnit.FEET),
							new QuantityLength(0.0, LengthUnit.INCH)
					)
			);
		}

		// 8 (Negative values)
		@Test
		void testAddition_NegativeValues() {
			assertEquals(
					new QuantityLength(3.0, LengthUnit.FEET),
					QuantityLength.add(
							new QuantityLength(5.0, LengthUnit.FEET),
							new QuantityLength(-2.0, LengthUnit.FEET)
					)
			);
		}
	}
