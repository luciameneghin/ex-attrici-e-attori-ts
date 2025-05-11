// Milestone 1
type Person = {
  readonly id: number;
  readonly name: string;
  birth_year: number;
  death_year?: number;
  biography: string;
  image: string;
}

// Milestone 2

type Actress = Person & {
  most_famous_movies: [string, string, string];
  awards: string;
  nationality: 'American' | 'British' | 'Australian' | 'Israeli-American' | 'South African' | 'French' | 'Indian' | 'Israeli' | 'Spanish' | 'South Korean' | 'Chinese';
}

// Milestone 3

function isActress(data: unknown): data is Actress {
  if (
    data &&
    typeof data === 'object' &&
    'id' in data &&
    typeof data.id === 'number' &&
    'name' in data &&
    typeof data.name === 'string' &&
    'birth_year' in data &&
    typeof data.birth_year === 'number' &&
    'biography' in data &&
    typeof data.biography === 'string' &&
    'image' in data &&
    typeof data.image === 'string' &&
    'most_famous_movies' in data &&
    typeof data.most_famous_movies === 'object' &&
    'awards' in data &&
    typeof data.awards === 'string' &&
    'nationality' in data &&
    typeof data.nationality === 'string'
  ) {
    return true;
  }
  return false;
}

function getActress(id: number): Promise<Actress | null> {
  return fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actresses/${id}`)
    .then(response => {
      if (!response.ok) {
        return null;
      }
      return response.json();
    })
    .then(data => {
      if (isActress(data)) {
        return data;
      }
      return null;
    });
}
