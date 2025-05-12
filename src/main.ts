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
  return fetch(`http://localhost:5001/actresses/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
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

// Milestone 4

function getAllActresses(): Promise<Actress[]> {
  return fetch('http://localhost:5001/actresses')
    .then(response => {
      if (!response.ok) {
        console.error('Error fetching actresses:', response.statusText);
        return [];
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data)) {
        return data.filter(isActress);
      }
      return [];
    })
    .catch(error => {
      console.error('Network or parsing error:', error);
      return [];
    });
}

getActress(1).then(data => {
  console.log('Actress data:', data);
});

getAllActresses().then(actresses => {
  console.log('All actresses:', actresses);
});


// Milestone 5
function getActresses(ids: number[]): Promise<(Actress | null)[]> {
  const promises = ids.map(id => getActress(id));
  return Promise.all(promises);
}
getActresses([6, 40, 2]).then(actresses => {
  console.log('Actresses data:', actresses);
});