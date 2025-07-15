import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { TeamMember, Skill } from '../../models/team.model';

@Component({
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.less']
})
export class TeamDashboardComponent implements OnInit {
  members: TeamMember[] = [];
  skills: Skill[] = [];
  showAddMember = false;
  newMember: TeamMember = { name: '', role: '' };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadMembers();
    this.loadSkills();
  }

  loadMembers() {
    this.apiService.getMembers().subscribe(members => {
      this.members = members;
    });
  }

  loadSkills() {
    this.apiService.getSkills().subscribe(skills => {
      this.skills = skills;
    });
  }

  addMember() {
    if (this.newMember.name && this.newMember.role) {
      this.apiService.addMember(this.newMember).subscribe(() => {
        this.loadMembers();
        this.newMember = { name: '', role: '' };
        this.showAddMember = false;
      });
    }
  }

  getSkillLevel(member: TeamMember, skillName: string): number {
    const skill = member.skills?.find(s => s.name === skillName);
    return skill ? skill.level : 0;
  }

  getSkillsByCategory(category: string): Skill[] {
    return this.skills.filter(skill => skill.category === category);
  }

  getCategories(): string[] {
    return [...new Set(this.skills.map(skill => skill.category))];
  }
}