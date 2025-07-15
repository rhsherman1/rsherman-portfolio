import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamMember, Skill, MemberSkillAssignment } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getMembers(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(`${this.baseUrl}/members`);
  }

  addMember(member: TeamMember): Observable<any> {
    return this.http.post(`${this.baseUrl}/members`, member);
  }

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.baseUrl}/skills`);
  }

  assignSkill(assignment: MemberSkillAssignment): Observable<any> {
    return this.http.post(`${this.baseUrl}/member-skills`, assignment);
  }
}