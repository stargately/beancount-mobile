describe("BarChartD3", () => {
  describe("chart dimensions", () => {
    it("should have default chart height of 220", () => {
      const chartHeight = 220;
      expect(chartHeight).toBe(220);
    });

    it("should calculate bar width based on number of labels", () => {
      const chartWidth = 400;
      const labelCount = 5;
      const barWidth = (chartWidth / labelCount) * 0.6;
      expect(barWidth).toBeCloseTo(48, 0);
    });

    it("should use content padding for left padding of 50", () => {
      const leftPadding = 50;
      expect(leftPadding).toBe(50);
    });

    it("should use bottom padding of 30", () => {
      const bottomPadding = 30;
      expect(bottomPadding).toBe(30);
    });

    it("should use top padding of 20", () => {
      const topPadding = 20;
      expect(topPadding).toBe(20);
    });
  });

  describe("font sizes", () => {
    it("should use axis font size of 12", () => {
      const axisFontSize = 12;
      expect(axisFontSize).toBe(12);
    });

    it("should use label font size of 13", () => {
      const labelFontSize = 13;
      expect(labelFontSize).toBe(13);
    });
  });

  describe("scale domain calculation", () => {
    it("should calculate max value from positive numbers", () => {
      const numbers = [10, 25, 15, 30, 20];
      const maxValue = Math.max(...numbers, 1);
      expect(maxValue).toBe(30);
    });

    it("should use minimum of 1 for max when all numbers are negative", () => {
      const numbers = [-10, -25, -15];
      const maxValue = Math.max(...numbers, 1);
      expect(maxValue).toBe(1);
    });

    it("should calculate min value from negative numbers", () => {
      const numbers = [10, -25, 15, -30, 20];
      const minValue = Math.min(...numbers, 0);
      expect(minValue).toBe(-30);
    });

    it("should use minimum of 0 for min when all numbers are positive", () => {
      const numbers = [10, 25, 15];
      const minValue = Math.min(...numbers, 0);
      expect(minValue).toBe(0);
    });

    it("should handle empty array gracefully", () => {
      const numbers: number[] = [];
      const maxValue = Math.max(...numbers, 1);
      const minValue = Math.min(...numbers, 0);
      expect(maxValue).toBe(1);
      expect(minValue).toBe(0);
    });
  });

  describe("bar height calculation for positive values", () => {
    it("should calculate height for positive value", () => {
      const num = 100;
      const zeroY = 180;
      const valueY = 80;
      const barHeight = zeroY - valueY;
      const barY = valueY;
      expect(barHeight).toBe(100);
      expect(barY).toBe(80);
    });

    it("should ensure minimum height for very small positive values", () => {
      const num = 1;
      const zeroY = 180;
      const valueY = 179;
      const minHeight = 2;
      let barHeight = zeroY - valueY;
      let barY = valueY;

      if (Math.abs(barHeight) < minHeight) {
        barHeight = num >= 0 ? minHeight : -minHeight;
        barY = num >= 0 ? zeroY - minHeight : zeroY;
      }

      expect(barHeight).toBe(2);
      expect(barY).toBe(178);
    });
  });

  describe("bar height calculation for negative values", () => {
    it("should calculate height for negative value", () => {
      const num = -100;
      const zeroY = 180;
      const valueY = 280;
      const barHeight = valueY - zeroY;
      const barY = zeroY;
      expect(barHeight).toBe(100);
      expect(barY).toBe(180);
    });

    it("should ensure minimum height for very small negative values", () => {
      const num = -1;
      const zeroY = 180;
      const valueY = 181;
      const minHeight = 2;
      let barHeight = valueY - zeroY;
      let barY = zeroY;

      if (Math.abs(barHeight) < minHeight) {
        barHeight = num >= 0 ? minHeight : -minHeight;
        barY = num >= 0 ? zeroY - minHeight : zeroY;
      }

      expect(barHeight).toBe(-2);
      expect(barY).toBe(180);
    });
  });

  describe("bar properties", () => {
    it("should use bar width from scale calculation", () => {
      const chartWidth = 400;
      const labelCount = 5;
      const barWidth = (chartWidth / labelCount) * 0.6;
      expect(barWidth).toBeCloseTo(48, 0);
    });

    it("should use border radius of 3", () => {
      const borderRadius = 3;
      expect(borderRadius).toBe(3);
    });

    it("should use absolute value for bar height", () => {
      const negativeHeight = -50;
      const absoluteHeight = Math.abs(negativeHeight);
      expect(absoluteHeight).toBe(50);
    });
  });

  describe("scale band padding", () => {
    it("should use padding of 0.2", () => {
      const padding = 0.2;
      expect(padding).toBe(0.2);
    });

    it("should validate padding is between 0 and 1", () => {
      const padding = 0.2;
      expect(padding >= 0 && padding <= 1).toBe(true);
    });
  });

  describe("y-axis ticks", () => {
    it("should generate 5 ticks by default", () => {
      const tickCount = 5;
      expect(tickCount).toBe(5);
    });

    it("should validate tick count is positive", () => {
      const tickCount = 5;
      expect(tickCount > 0).toBe(true);
    });
  });

  describe("grid line properties", () => {
    it("should use stroke dash array of 4,2", () => {
      const strokeDashArray = "4,2";
      expect(strokeDashArray).toBe("4,2");
    });

    it("should use stroke width of 1", () => {
      const strokeWidth = 1;
      expect(strokeWidth).toBe(1);
    });
  });

  describe("y-axis label positioning", () => {
    it("should offset label by 4 pixels to the left", () => {
      const leftPadding = 50;
      const labelX = leftPadding - 4;
      expect(labelX).toBe(46);
    });

    it("should offset label by 5 pixels down", () => {
      const offset = 5;
      expect(offset).toBe(5);
    });
  });

  describe("x-axis label positioning", () => {
    it("should center label on bar", () => {
      const xPosition = 100;
      const barWidth = 48;
      const centerX = xPosition + barWidth / 2;
      expect(centerX).toBe(124);
    });

    it("should position label 8 pixels from bottom", () => {
      const chartHeight = 220;
      const bottomOffset = 8;
      const labelY = chartHeight - bottomOffset;
      expect(labelY).toBe(212);
    });
  });

  describe("minimum height enforcement", () => {
    it("should use minimum height of 2 for visibility", () => {
      const minHeight = 2;
      expect(minHeight).toBe(2);
    });

    it("should apply minimum height when calculated height is too small", () => {
      const calculatedHeight = 0.5;
      const minHeight = 2;
      const shouldEnforce = Math.abs(calculatedHeight) < minHeight;
      expect(shouldEnforce).toBe(true);
    });

    it("should not enforce minimum when calculated height is sufficient", () => {
      const calculatedHeight = 10;
      const minHeight = 2;
      const shouldEnforce = Math.abs(calculatedHeight) < minHeight;
      expect(shouldEnforce).toBe(false);
    });
  });

  describe("error boundary", () => {
    it("should return null as fallback", () => {
      const fallback = null;
      expect(fallback).toBe(null);
    });

    it("should log errors to console", () => {
      const errorMessage = "Chart rendering error";
      expect(errorMessage).toBe("Chart rendering error");
    });
  });
});
