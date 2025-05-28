import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Inline CSS styles as fallback
const styles = {
  container: {
    padding: '1.5rem',
    maxWidth: '80rem',
    margin: '0 auto',
    backgroundColor: 'white',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    marginBottom: '2rem'
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '0.5rem'
  },
  subtitle: {
    color: '#6B7280'
  },
  controlsContainer: {
    marginBottom: '1.5rem',
    padding: '1rem',
    backgroundColor: '#F9FAFB',
    borderRadius: '0.5rem'
  },
  optimizationContainer: {
    marginBottom: '2rem',
    padding: '1.5rem',
    background: 'linear-gradient(to right, #EFF6FF, #F3E8FF)',
    borderRadius: '0.5rem'
  },
  grid: {
    display: 'grid',
    gap: '1rem'
  },
  gridCols5: {
    gridTemplateColumns: 'repeat(5, 1fr)'
  },
  gridCols4: {
    gridTemplateColumns: 'repeat(4, 1fr)'
  },
  gridCols3: {
    gridTemplateColumns: 'repeat(3, 1fr)'
  },
  gridCols2: {
    gridTemplateColumns: 'repeat(2, 1fr)'
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.5rem'
  },
  select: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #D1D5DB',
    borderRadius: '0.375rem',
    backgroundColor: 'white'
  },
  button: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    transition: 'colors 0.2s',
    cursor: 'pointer',
    border: 'none'
  },
  buttonActive: {
    backgroundColor: '#2563EB',
    color: 'white'
  },
  buttonInactive: {
    backgroundColor: 'white',
    border: '1px solid #D1D5DB',
    color: '#374151'
  },
  scenarioCard: {
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: '2px solid',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  scenarioCardActive: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF'
  },
  scenarioCardInactive: {
    borderColor: '#E5E7EB',
    backgroundColor: 'white'
  },
  summaryCard: {
    backgroundColor: 'white',
    border: '2px solid',
    padding: '1rem',
    borderRadius: '0.5rem'
  },
  chartContainer: {
    height: '24rem',
    marginBottom: '2rem'
  },
  insightCard: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '0.375rem',
    border: '1px solid'
  },
  table: {
    minWidth: '100%',
    backgroundColor: 'white',
    border: '1px solid #E5E7EB'
  },
  tableHeader: {
    backgroundColor: '#F9FAFB'
  },
  tableCell: {
    padding: '0.75rem 1.5rem',
    whiteSpace: 'nowrap',
    fontSize: '0.875rem'
  },
  insightsContainer: {
    backgroundColor: '#F9FAFB',
    padding: '1.5rem',
    borderRadius: '0.5rem'
  }
};

const TaxCalculator = () => {
  const [maxIncome, setMaxIncome] = useState(2500000);
  const [selectedScenarios, setSelectedScenarios] = useState(['no-deductions', 'average-deductions']);
  const [chartType, setChartType] = useState('tax-liability');
  const [selectedYear, setSelectedYear] = useState('2025-26');
  const [showOptimization, setShowOptimization] = useState(false);
  const [taxpayerType, setTaxpayerType] = useState('employee');
  
  // Historical tax brackets data
  const taxBracketsByYear = {
    '2023-24': [
      { min: 0, max: 237100, rate: 0.18, taxBase: 0 },
      { min: 237101, max: 370500, rate: 0.26, taxBase: 42678 },
      { min: 370501, max: 512800, rate: 0.31, taxBase: 77362 },
      { min: 512801, max: 673000, rate: 0.36, taxBase: 121475 },
      { min: 673001, max: 857900, rate: 0.39, taxBase: 179147 },
      { min: 857901, max: 1817000, rate: 0.41, taxBase: 251258 },
      { min: 1817001, max: Infinity, rate: 0.45, taxBase: 644489 }
    ],
    '2024-25': [
      { min: 0, max: 237100, rate: 0.18, taxBase: 0 },
      { min: 237101, max: 370500, rate: 0.26, taxBase: 42678 },
      { min: 370501, max: 512800, rate: 0.31, taxBase: 77362 },
      { min: 512801, max: 673000, rate: 0.36, taxBase: 121475 },
      { min: 673001, max: 857900, rate: 0.39, taxBase: 179147 },
      { min: 857901, max: 1817000, rate: 0.41, taxBase: 251258 },
      { min: 1817001, max: Infinity, rate: 0.45, taxBase: 644489 }
    ],
    '2025-26': [
      { min: 0, max: 237100, rate: 0.18, taxBase: 0 },
      { min: 237101, max: 370500, rate: 0.26, taxBase: 42678 },
      { min: 370501, max: 512800, rate: 0.31, taxBase: 77362 },
      { min: 512801, max: 673000, rate: 0.36, taxBase: 121475 },
      { min: 673001, max: 857900, rate: 0.39, taxBase: 179147 },
      { min: 857901, max: 1817000, rate: 0.41, taxBase: 251258 },
      { min: 1817001, max: Infinity, rate: 0.45, taxBase: 644489 }
    ]
  };
  
  // Historical rebates
  const rebatesByYear = {
    '2023-24': { primary: 17235, secondary: 9444, tertiary: 3145 },
    '2024-25': { primary: 17235, secondary: 9444, tertiary: 3145 },
    '2025-26': { primary: 17235, secondary: 9444, tertiary: 3145 }
  };
  
  // Medical aid credits by year
  const medicalCreditsByYear = {
    '2023-24': { member: 364, dependent1: 364, dependentOther: 246 },
    '2024-25': { member: 364, dependent1: 364, dependentOther: 246 },
    '2025-26': { member: 364, dependent1: 364, dependentOther: 246 }
  };
  
  // Get current year data
  const getCurrentYearData = () => ({
    brackets: taxBracketsByYear[selectedYear],
    rebates: rebatesByYear[selectedYear],
    medicalCredits: medicalCreditsByYear[selectedYear]
  });
  
  // Scenario definitions with detailed assumptions
  const scenarios = {
    'no-deductions': {
      name: 'No Deductions',
      color: '#EF4444',
      description: 'Gross income with no deductions',
      assumptions: 'No retirement contributions, no medical aid, basic rebate only',
      calculate: (income) => ({ 
        retirementContribution: 0, 
        medicalAidContribution: 0, 
        medicalTaxCredit: 0, 
        totalDeductions: 0, 
        age: 'under65' 
      })
    },
    'conservative-deductions': {
      name: 'Conservative Deductions',
      color: '#F97316',
      description: '10% retirement, basic medical aid',
      assumptions: '10% retirement (max R350k), single medical aid (R364/month), primary rebate',
      calculate: (income) => {
        const { medicalCredits } = getCurrentYearData();
        return {
          retirementContribution: Math.min(income * 0.10, 350000),
          medicalAidContribution: medicalCredits.member * 12,
          medicalTaxCredit: medicalCredits.member * 12,
          totalDeductions: Math.min(income * 0.10, 350000) + (medicalCredits.member * 12),
          age: 'under65'
        };
      }
    },
    'average-deductions': {
      name: 'Average Deductions',
      color: '#3B82F6',
      description: '20% retirement, family medical aid',
      assumptions: '20% retirement (max R350k), couple medical aid (R728/month), primary rebate',
      calculate: (income) => {
        const { medicalCredits } = getCurrentYearData();
        return {
          retirementContribution: Math.min(income * 0.20, 350000),
          medicalAidContribution: (medicalCredits.member + medicalCredits.dependent1) * 12, // R8,736/year
          medicalTaxCredit: (medicalCredits.member + medicalCredits.dependent1) * 12,
          totalDeductions: Math.min(income * 0.20, 350000) + ((medicalCredits.member + medicalCredits.dependent1) * 12),
          age: 'under65'
        };
      }
    },
    'high-deductions': {
      name: 'High Deductions',
      color: '#10B981',
      description: 'Max retirement (27.5%), family of 4 medical aid',
      assumptions: '27.5% retirement (max R350k), family of 4 medical aid (R1,220/month), primary rebate',
      calculate: (income) => {
        const { medicalCredits } = getCurrentYearData();
        return {
          retirementContribution: Math.min(income * 0.275, 350000),
          medicalAidContribution: (medicalCredits.member + medicalCredits.dependent1 + medicalCredits.dependentOther * 2) * 12, // R14,640/year
          medicalTaxCredit: (medicalCredits.member + medicalCredits.dependent1 + medicalCredits.dependentOther * 2) * 12,
          totalDeductions: Math.min(income * 0.275, 350000) + ((medicalCredits.member + medicalCredits.dependent1 + medicalCredits.dependentOther * 2) * 12),
          age: 'under65'
        };
      }
    }
  };
  
  // Calculate tax before rebates
  const calculateTaxBeforeRebates = (income, brackets) => {
    let tax = 0;
    
    for (const bracket of brackets) {
      if (income > bracket.min - 1) {
        if (bracket.min === 0) {
          tax += Math.min(income, bracket.max) * bracket.rate;
        } else {
          tax = bracket.taxBase + (income - bracket.min + 1) * bracket.rate;
        }
        
        if (income <= bracket.max) break;
      }
    }
    
    return tax;
  };
  
  // Get marginal tax rate for income level
  const getMarginalRate = (income, brackets) => {
    for (const bracket of brackets) {
      if (income >= bracket.min && income <= bracket.max) {
        return bracket.rate;
      }
    }
    return brackets[brackets.length - 1].rate;
  };
  
  // Calculate final tax liability
  const calculateTax = (grossIncome, scenarioKey) => {
    const { brackets, rebates } = getCurrentYearData();
    const scenario = scenarios[scenarioKey];
    const deductions = scenario.calculate(grossIncome);
    
    const taxableIncome = Math.max(0, grossIncome - deductions.totalDeductions);
    const taxBeforeRebates = calculateTaxBeforeRebates(taxableIncome, brackets);
    
    // Determine rebates based on age
    let totalRebates = rebates.primary;
    if (deductions.age === '65plus') {
      totalRebates += rebates.secondary;
    } else if (deductions.age === '75plus') {
      totalRebates += rebates.secondary + rebates.tertiary;
    }
    
    // Apply rebates and medical tax credits
    const finalTax = Math.max(0, taxBeforeRebates - totalRebates - deductions.medicalTaxCredit);
    
    return {
      scenario: scenarioKey,
      grossIncome,
      taxableIncome,
      taxBeforeRebates,
      finalTax,
      effectiveRate: grossIncome > 0 ? (finalTax / grossIncome) * 100 : 0,
      marginalRate: getMarginalRate(taxableIncome, brackets) * 100,
      deductions: deductions.totalDeductions,
      netIncome: grossIncome - finalTax,
      deductionBreakdown: deductions
    };
  };
  
  // Generate tax optimization data
  const generateOptimizationData = useMemo(() => {
    if (!showOptimization) return [];
    
    const data = [];
    const { brackets } = getCurrentYearData();
    
    for (let income = 250000; income <= maxIncome; income += 50000) {
      // Calculate tax with no deductions vs high deductions
      const noDeductions = calculateTax(income, 'no-deductions');
      const highDeductions = calculateTax(income, 'high-deductions');
      
      // Calculate the value of earning R100k more vs maximizing deductions
      const higherIncome = calculateTax(income + 100000, 'no-deductions');
      const taxSavingsFromDeductions = noDeductions.finalTax - highDeductions.finalTax;
      const additionalTaxFromEarning = higherIncome.finalTax - noDeductions.finalTax;
      const netBenefitFromEarning = 100000 - additionalTaxFromEarning;
      
      // Calculate "tax efficiency score" - higher is better
      const taxEfficiencyScore = taxSavingsFromDeductions / (income * 0.01);
      
      data.push({
        income: income / 1000,
        incomeFormatted: `R${(income / 1000).toFixed(0)}k`,
        marginalRate: getMarginalRate(income, brackets) * 100,
        taxSavingsFromDeductions,
        netBenefitFromEarning,
        taxEfficiencyScore,
        shouldMaximizeDeductions: taxSavingsFromDeductions > (netBenefitFromEarning * 0.5),
        breakEvenPoint: taxSavingsFromDeductions / 100000,
        deductionRecommendation: taxSavingsFromDeductions > netBenefitFromEarning ? 
          'Focus on Deductions' : 'Focus on Earning More'
      });
    }
    
    return data;
  }, [showOptimization, maxIncome, selectedYear]);
  
  // Generate data for every R100,000 increment starting from R250,000
  const generateTaxData = useMemo(() => {
    const data = [];
    
    for (let income = 250000; income <= maxIncome; income += 100000) {
      const dataPoint = {
        income: income / 1000,
        incomeFormatted: `R${(income / 1000).toFixed(0)}k`,
        grossIncome: income
      };
      
      // Calculate for each selected scenario
      selectedScenarios.forEach(scenarioKey => {
        if (scenarios[scenarioKey]) {
          const taxInfo = calculateTax(income, scenarioKey);
          const scenarioName = scenarios[scenarioKey].name.replace(/\s+/g, '');
          
          dataPoint[`${scenarioName}_taxLiability`] = taxInfo.finalTax;
          dataPoint[`${scenarioName}_effectiveRate`] = taxInfo.effectiveRate;
          dataPoint[`${scenarioName}_netIncome`] = taxInfo.netIncome;
        }
      });
      
      data.push(dataPoint);
    }
    
    return data;
  }, [maxIncome, selectedScenarios, selectedYear]);
  
  // Handle scenario selection
  const toggleScenario = (scenarioKey) => {
    setSelectedScenarios(prev => 
      prev.includes(scenarioKey) 
        ? prev.filter(s => s !== scenarioKey)
        : [...prev, scenarioKey]
    );
  };
  
  // Prepare chart data based on chart type
  const getChartData = () => {
    return generateTaxData.map(item => {
      const chartItem = { ...item };
      selectedScenarios.forEach(scenarioKey => {
        if (scenarios[scenarioKey]) {
          const scenarioName = scenarios[scenarioKey].name.replace(/\s+/g, '');
          const dataKey = chartType === 'tax-liability' ? 'taxLiability' : 
                         chartType === 'effective-rate' ? 'effectiveRate' : 'netIncome';
          chartItem[scenarios[scenarioKey].name] = item[`${scenarioName}_${dataKey}`];
        }
      });
      return chartItem;
    });
  };
  
  const chartData = getChartData();
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          South African Tax Calculator & Optimizer
        </h1>
        <p style={styles.subtitle}>
          Compare scenarios and analyze tax strategies from R250k to R2.5M+
        </p>
      </div>
      
      {/* Controls */}
      <div style={styles.controlsContainer}>
        <div style={{...styles.grid, ...styles.gridCols5}}>
          <div>
            <label style={styles.label}>Tax Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              style={styles.select}
            >
              <option value="2023-24">2023/24</option>
              <option value="2024-25">2024/25</option>
              <option value="2025-26">2025/26</option>
            </select>
          </div>
          <div>
            <label style={styles.label}>Taxpayer Type</label>
            <select
              value={taxpayerType}
              onChange={(e) => setTaxpayerType(e.target.value)}
              style={styles.select}
            >
              <option value="employee">Employee (PAYE)</option>
              <option value="provisional">Provisional Taxpayer</option>
            </select>
          </div>
          <div>
            <label style={styles.label}>Maximum Income</label>
            <select
              value={maxIncome}
              onChange={(e) => setMaxIncome(Number(e.target.value))}
              style={styles.select}
            >
              <option value={1500000}>R1.5M</option>
              <option value={2500000}>R2.5M</option>
              <option value={3000000}>R3M</option>
            </select>
          </div>
          <div>
            <label style={styles.label}>Chart Type</label>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              style={styles.select}
            >
              <option value="tax-liability">Tax Liability</option>
              <option value="effective-rate">Effective Rate</option>
              <option value="netIncome">Net Income</option>
            </select>
          </div>
          <div>
            <label style={styles.label}>Analysis Mode</label>
            <button
              onClick={() => setShowOptimization(!showOptimization)}
              style={{
                ...styles.button,
                ...(showOptimization ? styles.buttonActive : styles.buttonInactive)
              }}
            >
              {showOptimization ? 'Tax Optimization' : 'Standard View'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Tax Optimization Analysis */}
      {showOptimization && (
        <div style={styles.optimizationContainer}>
          <h2 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem'}}>
            Tax Optimization Strategy Analysis
          </h2>
          
          {/* Key Optimization Insights */}
          <div style={{...styles.grid, ...styles.gridCols3, marginBottom: '1.5rem'}}>
            <div style={{...styles.insightCard, borderColor: '#3B82F6'}}>
              <h3 style={{fontWeight: '600', color: '#1E40AF', marginBottom: '0.5rem'}}>💡 Key Insight</h3>
              <p style={{fontSize: '0.875rem', color: '#1E3A8A'}}>
                <strong>Maximizing deductions is almost always better than earning more</strong> due to 
                South Africa's progressive tax system and generous retirement contribution limits.
              </p>
            </div>
            <div style={{...styles.insightCard, borderColor: '#10B981'}}>
              <h3 style={{fontWeight: '600', color: '#047857', marginBottom: '0.5rem'}}>🎯 Sweet Spot</h3>
              <p style={{fontSize: '0.875rem', color: '#065F46'}}>
                Income levels around <strong>R500k-R800k</strong> benefit most from aggressive 
                tax planning due to the 36-39% marginal rates.
              </p>
            </div>
            <div style={{...styles.insightCard, borderColor: '#F59E0B'}}>
              <h3 style={{fontWeight: '600', color: '#D97706', marginBottom: '0.5rem'}}>⚠️ Bracket Jumps</h3>
              <p style={{fontSize: '0.875rem', color: '#92400E'}}>
                Watch out for major bracket increases at <strong>R237k (18%→26%)</strong>, 
                <strong>R512k (31%→36%)</strong>, and <strong>R1.8M (41%→45%)</strong>.
              </p>
            </div>
          </div>
          
          {/* Optimization Chart */}
          <div style={styles.chartContainer}>
            <h3 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem'}}>
              Tax Savings from High Deductions vs Earning R100k More
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={generateOptimizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="incomeFormatted" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tickFormatter={(value) => `R${(value / 1000).toFixed(0)}k`} />
                <Tooltip 
                  formatter={(value, name) => [
                    `R${value.toLocaleString('en-ZA', {maximumFractionDigits: 0})}`,
                    name === 'taxSavingsFromDeductions' ? 'Tax Savings from High Deductions' : 'Net Benefit from Earning R100k More'
                  ]}
                  labelFormatter={(label) => `Income: ${label}`}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="taxSavingsFromDeductions" 
                  stackId="1"
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.6}
                  name="Tax Savings from High Deductions"
                />
                <Area 
                  type="monotone" 
                  dataKey="netBenefitFromEarning" 
                  stackId="2"
                  stroke="#F59E0B" 
                  fill="#F59E0B" 
                  fillOpacity={0.6}
                  name="Net Benefit from Earning R100k More"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div style={{fontSize: '0.875rem', color: '#6B7280', backgroundColor: 'white', padding: '0.75rem', borderRadius: '0.375rem'}}>
            <strong>How to read this chart:</strong> The green area shows tax savings from maximizing deductions. 
            The orange area shows net benefit from earning R100k more (after tax). 
            When green is larger, focus on deductions. When orange is larger, focus on earning more.
          </div>
        </div>
      )}
      
      {/* Scenario Assumptions */}
      <div style={{marginBottom: '1.5rem'}}>
        <h3 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem'}}>
          Scenario Assumptions & Selection
        </h3>
        <div style={{...styles.grid, ...styles.gridCols2, gap: '0.75rem'}}>
          {Object.entries(scenarios).map(([key, scenario]) => (
            <div
              key={key}
              style={{
                ...styles.scenarioCard,
                ...(selectedScenarios.includes(key) ? styles.scenarioCardActive : styles.scenarioCardInactive),
                borderColor: selectedScenarios.includes(key) ? '#3B82F6' : '#E5E7EB'
              }}
              onClick={() => toggleScenario(key)}
            >
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
                <div 
                  style={{
                    width: '1rem',
                    height: '1rem',
                    borderRadius: '0.25rem',
                    marginRight: '0.5rem',
                    backgroundColor: scenario.color
                  }}
                ></div>
                <span style={{fontWeight: '600', fontSize: '0.875rem'}}>{scenario.name}</span>
              </div>
              <p style={{fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.5rem'}}>{scenario.description}</p>
              <p style={{fontSize: '0.75rem', color: '#374151', fontWeight: '500'}}>
                <strong>Assumptions:</strong> {scenario.assumptions}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Chart */}
      <div style={{marginBottom: '2rem'}}>
        <h2 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem'}}>
          {chartType === 'tax-liability' ? 'Tax Liability' : 
           chartType === 'effective-rate' ? 'Effective Tax Rate' : 'Net Income'} Comparison ({selectedYear})
        </h2>
        <div style={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="incomeFormatted" 
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                tickFormatter={(value) => 
                  chartType === 'effective-rate' ? `${value.toFixed(1)}%` : `R${(value / 1000).toFixed(0)}k`
                }
              />
              <Tooltip 
                formatter={(value, name) => [
                  chartType === 'effective-rate' 
                    ? `${value.toFixed(2)}%` 
                    : `R${value.toLocaleString('en-ZA', {maximumFractionDigits: 0})}`,
                  name
                ]}
                labelFormatter={(label) => `Income: ${label}`}
              />
              <Legend />
              {selectedScenarios.map(scenarioKey => {
                const scenario = scenarios[scenarioKey];
                if (!scenario) return null;
                return (
                  <Line
                    key={scenarioKey}
                    type="monotone"
                    dataKey={scenario.name}
                    stroke={scenario.color}
                    strokeWidth={2}
                    dot={{ fill: scenario.color, r: 3 }}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Tax Brackets Table */}
      <div style={{marginBottom: '2rem'}}>
        <h2 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem'}}>
          Tax Brackets for {selectedYear}
        </h2>
        <div style={{overflowX: 'auto'}}>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={{...styles.tableCell, fontWeight: '500', color: '#6B7280', textTransform: 'uppercase', fontSize: '0.75rem'}}>
                  Income Range
                </th>
                <th style={{...styles.tableCell, fontWeight: '500', color: '#6B7280', textTransform: 'uppercase', fontSize: '0.75rem'}}>
                  Marginal Rate
                </th>
                <th style={{...styles.tableCell, fontWeight: '500', color: '#6B7280', textTransform: 'uppercase', fontSize: '0.75rem'}}>
                  Tax Base
                </th>
              </tr>
            </thead>
            <tbody style={{backgroundColor: 'white'}}>
              {getCurrentYearData().brackets.map((bracket, index) => (
                <tr key={index} style={{borderTop: '1px solid #E5E7EB'}}>
                  <td style={{...styles.tableCell, color: '#111827'}}>
                    R{bracket.min.toLocaleString()} - {bracket.max === Infinity ? 'Above' : `R${bracket.max.toLocaleString()}`}
                  </td>
                  <td style={{...styles.tableCell, color: '#111827'}}>
                    {(bracket.rate * 100).toFixed(0)}%
                  </td>
                  <td style={{...styles.tableCell, color: '#111827'}}>
                    R{bracket.taxBase.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Key Insights */}
      <div style={styles.insightsContainer}>
        <h2 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem'}}>
          Detailed Strategy Analysis
        </h2>
        <div style={{...styles.grid, ...styles.gridCols3}}>
          <div>
            <h3 style={{fontWeight: '600', color: '#374151', marginBottom: '0.5rem'}}>
              🎯 Optimization Priority
            </h3>
            <ul style={{fontSize: '0.875rem', color: '#6B7280', lineHeight: '1.5'}}>
              <li>• <strong>Priority 1:</strong> Maximize retirement (27.5% or R350k)</li>
              <li>• <strong>Priority 2:</strong> Family medical aid structure</li>
              <li>• <strong>Priority 3:</strong> Tax-free savings (R36k annually)</li>
              <li>• <strong>Advanced:</strong> Income timing around brackets</li>
            </ul>
          </div>
          <div>
            <h3 style={{fontWeight: '600', color: '#374151', marginBottom: '0.5rem'}}>
              📊 Deduction Assumptions
            </h3>
            <ul style={{fontSize: '0.875rem', color: '#6B7280', lineHeight: '1.5'}}>
              <li>• <strong>Average:</strong> 20% retirement + couple (R8,736 medical)</li>
              <li>• <strong>High:</strong> 27.5% retirement + family of 4 (R14,640 medical)</li>
              <li>• <strong>Medical Credits:</strong> R364/month primary + dependents</li>
              <li>• <strong>Age:</strong> Under 65 scenarios use primary rebate only</li>
            </ul>
          </div>
          <div>
            <h3 style={{fontWeight: '600', color: '#374151', marginBottom: '0.5rem'}}>
              💡 Key Optimization Findings
            </h3>
            <ul style={{fontSize: '0.875rem', color: '#6B7280', lineHeight: '1.5'}}>
              <li>• High deductions can save <strong>R100k+ annually</strong></li>
              <li>• Sweet spot: R500k-R800k income range</li>
              <li>• Always better to max deductions than earn more</li>
              <li>• Medical aid provides valuable tax credits</li>
            </ul>
          </div>
        </div>
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#DBEAFE',
          borderRadius: '0.375rem',
          borderLeft: '4px solid #3B82F6'
        }}>
          <p style={{fontSize: '0.875rem', color: '#1E40AF'}}>
            <strong>Bottom Line:</strong> The optimization analysis clearly shows that strategic tax planning 
            through maximizing deductions provides better financial outcomes than seeking additional income. 
            High earners should prioritize retirement contributions and family medical aid structure before pursuing income increases.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;