package QuantityMeasurementApp;

import com.quantity.measurement.enums.LengthUnit;
import com.quantity.measurement.model.QuantityLength;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MeasurementApplicationTests {

		// 1
		@Test
		void testEquality_YardToYard_SameValue() {
			assertEquals(
					new QuantityLength(1.0, LengthUnit.YARDS),
					new QuantityLength(1.0, LengthUnit.YARDS)
			);
		}

		// 2
		@Test
		void testEquality_YardToYard_DifferentValue() {
			assertNotEquals(
					new QuantityLength(1.0, LengthUnit.YARDS),
					new QuantityLength(2.0, LengthUnit.YARDS)
			);
		}

		// 3
		@Test
		void testEquality_YardToFeet_EquivalentValue() {
			assertEquals(
					new QuantityLength(1.0, LengthUnit.YARDS),
					new QuantityLength(3.0, LengthUnit.FEET)
			);
		}

		// 4
		@Test
		void testEquality_FeetToYard_EquivalentValue() {
			assertEquals(
					new QuantityLength(3.0, LengthUnit.FEET),
					new QuantityLength(1.0, LengthUnit.YARDS)
			);
		}

		// 5
		@Test
		void testEquality_YardToInches_EquivalentValue() {
			assertEquals(
					new QuantityLength(1.0, LengthUnit.YARDS),
					new QuantityLength(36.0, LengthUnit.INCH)
			);
		}

		// 6
		@Test
		void testEquality_InchesToYard_EquivalentValue() {
			assertEquals(
					new QuantityLength(36.0, LengthUnit.INCH),
					new QuantityLength(1.0, LengthUnit.YARDS)
			);
		}

		// 7
		@Test
		void testEquality_YardToFeet_NonEquivalentValue() {
			assertNotEquals(
					new QuantityLength(1.0, LengthUnit.YARDS),
					new QuantityLength(2.0, LengthUnit.FEET)
			);
		}

		// 8
		@Test
		void testEquality_CentimetersToInches_EquivalentValue() {
			assertEquals(
					new QuantityLength(1.0, LengthUnit.CENTIMETERS),
					new QuantityLength(0.393701, LengthUnit.INCH)
			);
		}

		// 9
		@Test
		void testEquality_CentimetersToFeet_NonEquivalentValue() {
			assertNotEquals(
					new QuantityLength(1.0, LengthUnit.CENTIMETERS),
					new QuantityLength(1.0, LengthUnit.FEET)
			);
		}

		// 10 (Transitive property)
		@Test
		void testEquality_MultiUnit_TransitiveProperty() {
			QuantityLength yard = new QuantityLength(1.0, LengthUnit.YARDS);
			QuantityLength feet = new QuantityLength(3.0, LengthUnit.FEET);
			QuantityLength inch = new QuantityLength(36.0, LengthUnit.INCH);

			assertEquals(yard, feet);
			assertEquals(feet, inch);
			assertEquals(yard, inch);
		}

		// 11
		@Test
		void testEquality_YardWithNullUnit() {
			assertThrows(IllegalArgumentException.class, () -> {
				new QuantityLength(1.0, null);
			});
		}

		// 12 (Reflexive)
		@Test
		void testEquality_YardSameReference() {
			QuantityLength q = new QuantityLength(1.0, LengthUnit.YARDS);
			assertEquals(q, q);
		}

		// 13
		@Test
		void testEquality_YardNullComparison() {
			QuantityLength q = new QuantityLength(1.0, LengthUnit.YARDS);
			assertNotEquals(q, null);
		}

		// 14
		@Test
		void testEquality_CentimetersWithNullUnit() {
			assertThrows(IllegalArgumentException.class, () -> {
				new QuantityLength(1.0, null);
			});
		}

		// 15 (Reflexive)
		@Test
		void testEquality_CentimetersSameReference() {
			QuantityLength q = new QuantityLength(1.0, LengthUnit.CENTIMETERS);
			assertEquals(q, q);
		}

		// 16
		@Test
		void testEquality_CentimetersNullComparison() {
			QuantityLength q = new QuantityLength(1.0, LengthUnit.CENTIMETERS);
			assertNotEquals(q, null);
		}

		// 17 (Complex multi-unit)
		@Test
		void testEquality_AllUnits_ComplexScenario() {
			QuantityLength yard = new QuantityLength(2.0, LengthUnit.YARDS);
			QuantityLength feet = new QuantityLength(6.0, LengthUnit.FEET);
			QuantityLength inch = new QuantityLength(72.0, LengthUnit.INCH);

			assertEquals(yard, feet);
			assertEquals(feet, inch);
			assertEquals(yard, inch);
		}
	}