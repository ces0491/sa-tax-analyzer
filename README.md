# South African Tax Calculator & Optimizer

A comprehensive React-based tax calculation and optimization tool for South African taxpayers, helping you understand tax implications across different income levels and deduction scenarios.

?? **Live Demo:** [https://steady-moxie-1c1482.netlify.app/](https://steady-moxie-1c1482.netlify.app/)

## Features

### ?? Tax Scenario Comparison
- **No Deductions:** Basic tax calculation with no deductions
- **Conservative Deductions:** 10% retirement + basic medical aid
- **Average Deductions:** 20% retirement + family medical aid  
- **High Deductions:** Maximum 27.5% retirement + family of 4 medical aid

### ?? Interactive Visualizations
- **Tax Liability Charts:** Compare absolute tax amounts across scenarios
- **Effective Rate Analysis:** View effective tax rates by income level
- **Net Income Comparison:** See take-home pay after taxes
- **Optimization Analysis:** Advanced mode showing deduction benefits vs. earning more

### ?? Tax Optimization Insights
- Strategic recommendations for maximizing deductions
- Analysis of when to focus on deductions vs. increasing income
- Tax bracket impact visualization
- Real-time optimization scoring

### ?? Multi-Year Support
- Tax years: 2023/24, 2024/25, 2025/26
- Historical tax bracket comparisons
- Updated rebates and medical aid credits

### ?? Key Features
- Income analysis from R250k to R3M+
- Comprehensive tax bracket tables
- Medical aid tax credit calculations
- Retirement contribution optimization
- Progressive tax system visualization

## How to Use

1. **Select Tax Year:** Choose from available tax years (2023-26)
2. **Choose Taxpayer Type:** Employee (PAYE) or Provisional Taxpayer
3. **Set Income Range:** Adjust maximum income for analysis (up to R3M)
4. **Select Scenarios:** Choose which deduction scenarios to compare
5. **Choose Chart Type:** View tax liability, effective rates, or net income
6. **Toggle Optimization Mode:** Get advanced tax planning insights

### Optimization Mode
Enable optimization mode to see:
- Tax savings from maximizing deductions vs. earning more
- Income "sweet spots" for tax planning
- Strategic recommendations by income level
- Break-even analysis for different approaches

## Technology Stack

- **Frontend:** React 19.1.0
- **Charts:** Recharts 2.15.3
- **Styling:** Tailwind CSS (CDN)
- **Testing:** Jest & React Testing Library
- **Deployment:** Netlify

## Local Development

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sa-tax-analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view in your browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Tax Calculation Details

### Tax Brackets (2025/26)
- 0 - R237,100: 18%
- R237,101 - R370,500: 26%
- R370,501 - R512,800: 31%
- R512,801 - R673,000: 36%
- R673,001 - R857,900: 39%
- R857,901 - R1,817,000: 41%
- R1,817,001+: 45%

### Rebates & Credits
- **Primary Rebate:** R17,235
- **Secondary Rebate (65+):** R9,444
- **Tertiary Rebate (75+):** R3,145
- **Medical Aid Credits:** R364/month per member, R246/month additional dependents

### Deduction Limits
- **Retirement Contributions:** Maximum 27.5% of income or R350,000
- **Medical Aid:** Full contribution deductible + tax credits
- **Tax-Free Savings:** R36,000 annually (not included in calculations)

## Key Insights

The calculator reveals several important tax optimization strategies:

1. **Maximizing deductions is almost always better than earning more** due to South Africa's progressive tax system
2. **Income levels R500k-R800k benefit most** from aggressive tax planning
3. **Major bracket jumps** occur at R237k, R512k, and R1.8M income levels
4. **High deductions can save R100k+ annually** for high earners

## Deployment

The application is automatically deployed to Netlify from the main branch:
- **Live URL:** [https://steady-moxie-1c1482.netlify.app/](https://steady-moxie-1c1482.netlify.app/)
- **Build Command:** `npm run build`
- **Publish Directory:** `build`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Disclaimer

Tax calculations are based on publicly available SARS information and may not reflect your specific tax situation. Always consult with a qualified tax professional for personalized advice.

## License

This project is open source and available under the [MIT License](LICENSE).

---