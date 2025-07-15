export interface TeamMember {
  id?: number;
  name: string;
  role: string;
  avatar?: string;
  github?: string;
  skills?: MemberSkill[];
  created_at?: string;
}

export interface Skill {
  id?: number;
  name: string;
  category: string;
  icon?: string;
  created_at?: string;
}

export interface MemberSkill {
  name: string;
  level: number;
}

export interface MemberSkillAssignment {
  member_id: number;
  skill_id: number;
  level: number;
}