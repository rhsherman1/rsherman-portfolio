import { Component } from '@angular/core';

interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

interface Skill {
  category: string;
  items: string[];
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.less']
})
export class PortfolioComponent {
  name = 'Richard H. Sherman';
  position = 'Software Engineer';
  summary = 'Experienced .NET C# developer with over 30 years of expertise and proven track record in developing automated workflows, enhancing system performance, and leading successful implementations.';
  
  yearsExperience = 30;
  workflowExperience = 13;
  
  skills: Skill[] = [
    { category: 'Languages', items: ['C#', 'C++', '.NET Framework', '.NET Core'] },
    { category: 'Workflow', items: ['Windows Workflow Foundation', 'Process Automation'] },
    { category: 'Frontend', items: ['ASP.NET', 'WPF', 'Angular (limited experience)', 'JavaScript'] },
    { category: 'Backend', items: ['WCF', 'RESTful APIs', 'COM/ActiveX'] },
    { category: 'Database', items: ['SQL Server', 'Oracle', 'MySQL'] },
    { category: 'Tools', items: ['Visual Studio', 'Git', 'Azure DevOps'] }
  ];

  experiences: Experience[] = [
    {
      company: 'AssetWorks LLC',
      role: 'Software Engineer',
      period: '2012-Present',
      highlights: [
        'Developed complex workflows using tool like Windows Workflow Foundation',
        'Enhanced WPF applications for motor pool key distribution systems',
        'Improved predictive analytics and telematics systems',
        'Extensive experience in cross-functional team collaborations'
      ]
    },
    {
      company: 'DataDot Technology (USA) Inc.',
      role: 'Software Engineer', 
      period: '2002-2011',
      highlights: [
        'Designed Win32 client/server applications',
        'Implemented production tracking and order management systems',
        'Developed essential COM components for business operations'
      ]
    },
    {
      company: 'ROI Direct.com',
      role: 'Lead Software Engineer',
      period: '1993-2000',
      highlights: [
        'Led eCRM web application development',
        'Automated online marketing web components',
        'Developed Java components using WebObjects'
      ]
    }
  ];

  qualities = [
    {
      title: 'Technical Proficiency',
      icon: '⚡',
      description: '20+ years mastering C#/.NET with specialized workflow automation expertise'
    },
    {
      title: 'Problem Solving',
      icon: '🧩',
      description: 'Enhanced system performance and automated complex business processes'
    },
    {
      title: 'Work Ethic',
      icon: '🎯',
      description: 'Consistent 12+ year tenure at AssetWorks with continuous skill advancement'
    },
    {
      title: 'Initiative',
      icon: '🚀',
      description: 'Led development of critical systems and received performance recognition'
    },
    {
      title: 'Teamwork',
      icon: '🤝',
      description: 'Collaborated across teams and mentored in cross-functional environments'
    },
    {
      title: 'Adaptability',
      icon: '🔄',
      description: 'Evolved from Win32 to modern web technologies and cloud platforms'
    }
  ];
}