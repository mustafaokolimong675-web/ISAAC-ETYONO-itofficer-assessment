package com.enterprise.template.util;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

public class CalculationEngine {

    public static BigDecimal calculateTotal(List<BigDecimal> amounts) {
        return amounts.stream()
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public static BigDecimal calculatePercentage(BigDecimal total, BigDecimal percentage) {
        return total.multiply(percentage).divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP);
    }

    public static BigDecimal calculateAverage(List<BigDecimal> amounts) {
        if (amounts == null || amounts.isEmpty()) return BigDecimal.ZERO;
        BigDecimal total = calculateTotal(amounts);
        return total.divide(new BigDecimal(amounts.size()), 2, RoundingMode.HALF_UP);
    }

    public static BigDecimal calculateDiscount(BigDecimal price, BigDecimal discountPercent) {
        BigDecimal discountAmount = calculatePercentage(price, discountPercent);
        return price.subtract(discountAmount);
    }

    public static BigDecimal calculateTax(BigDecimal amount, BigDecimal taxRate) {
        return calculatePercentage(amount, taxRate);
    }

    public static BigDecimal calculateInterest(BigDecimal principal, BigDecimal rate, int timeInYears) {
        // Simple Interest: P * R * T / 100
        return principal.multiply(rate).multiply(new BigDecimal(timeInYears))
                .divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP);
    }

    public static String determineGrade(double score) {
        if (score >= 90) return "A";
        if (score >= 80) return "B";
        if (score >= 70) return "C";
        if (score >= 60) return "D";
        return "F";
    }

    public static BigDecimal calculateInventoryValue(BigDecimal unitPrice, int quantity) {
        return unitPrice.multiply(new BigDecimal(quantity));
    }

    public static BigDecimal calculateNetSalary(BigDecimal basic, BigDecimal deductions, BigDecimal bonuses) {
        return basic.subtract(deductions).add(bonuses);
    }
}
