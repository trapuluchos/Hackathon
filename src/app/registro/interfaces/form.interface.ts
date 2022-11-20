import { GithubRepoSmall } from './github-response.interface';

export interface Registro {
    nombres: string;
    apellidos: string;
    ci: string
    extension: string
    fechaNacimiento: string;
    direccion: string;
    repositorios?: GithubRepoSmall[];
}

