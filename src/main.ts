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
type actressNationality = 'American' | 'British' | 'Australian' | 'Israeli-American' | 'South African' | 'French' | 'Indian' | 'Israeli' | 'Spanish' | 'South Korean' | 'Chinese';

type Actress = Person & {
  most_famous_movies: [string, string, string];
  awards: string;
  nationality: actressNationality
}

// Bonus 2
type actorNationality = 'American' | 'British' | 'Australian' | 'Israeli-American' | 'South African' | 'French' | 'Indian' | 'Israeli' | 'Spanish' | 'South Korean' | 'Chinese' | 'Scottish' | 'New Zealand' | 'Hong Kong' | 'German' | 'Canadian' | 'Irish';

type Actor = Person & {
  known_for: [string, string, string];
  awards: [string] | [string, string];
  nationality: actorNationality;
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
    data.most_famous_movies instanceof Array &&
    data.most_famous_movies.length === 3 &&
    data.most_famous_movies.every(m => typeof m === 'string') &&
    'awards' in data &&
    typeof data.awards === 'string' &&
    'nationality' in data &&
    typeof data.nationality === 'string'
  ) {
    return true;
  }
  return false;
}

async function getActress(id: number): Promise<Actress | null> {
  try {
    const response = await fetch(`http://localhost:5001/actresses/${id}`);
    const data: unknown = await response.json();
    if (!isActress(data)) {
      throw new Error('Invalid actress data');
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    return null;
  }
}
// return fetch(`http://localhost:5001/actresses/${id}`, {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })
//   .then(response => {
//     if (!response.ok) {
//       return null;
//     }
//     return response.json();
//   })
//   .then(data => {
//     if (isActress(data)) {
//       return data;
//     }
//     return null;
//   });


// Milestone 4

async function getAllActresses(): Promise<Actress[]> {
  try {
    const response = await fetch('http://localhost:5001/actresses');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}: ${response.statusText}`);
    }
    const data: unknown = await response.json();
    if (!(data instanceof Array)) {
      throw new Error('Invalid data format');
    }
    const validActresses: Actress[] = data.filter(isActress);
    return validActresses;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    return [];
  }
}
//   return fetch('http://localhost:5001/actresses')
//     .then(response => {
//       if (!response.ok) {
//         console.error('Error fetching actresses:', response.statusText);
//         return [];
//       }
//       return response.json();
//     })
//     .then(data => {
//       if (Array.isArray(data)) {
//         return data.filter(isActress);
//       }
//       return [];
//     })
//     .catch(error => {
//       console.error('Network or parsing error:', error);
//       return [];
//     });
// }

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

// Bonus 1
function createActress(actress: Omit<Actress, 'id'>): Promise<Actress | null> {
  return fetch('http://localhost:5001/actresses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(actress)
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

function updateActress(actress: Partial<Actress> & { id: number }): Promise<Actress | null> {
  return fetch(`http://localhost:5001/actresses/${actress.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(actress)
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

// bonus 2
function isActor(data: unknown): data is Actor {
  const nationalities: string[] = [
    'American', 'British', 'Australian', 'Israeli-American', 'South African',
    'French', 'Indian', 'Israeli', 'Spanish', 'South Korean', 'Chinese',
    'Scottish', 'New Zealand', 'Hong Kong', 'German', 'Canadian', 'Irish'
  ];

  if (
    data &&
    typeof data === 'object' &&
    'id' in data && typeof data.id === 'number' &&
    'name' in data && typeof data.name === 'string' &&
    'birth_year' in data && typeof data.birth_year === 'number' &&
    'biography' in data && typeof data.biography === 'string' &&
    'image' in data && typeof data.image === 'string' &&
    'known_for' in data &&
    Array.isArray(data.known_for) &&
    data.known_for.length === 3 &&
    data.known_for.every(item => typeof item === 'string') &&
    'awards' in data &&
    Array.isArray(data.awards) &&
    (data.awards.length === 1 || data.awards.length === 2) &&
    data.awards.every(item => typeof item === 'string') &&
    'nationality' in data &&
    typeof data.nationality === 'string' &&
    nationalities.includes(data.nationality)
  ) {
    return true;
  }

  return false;
}

function getActor(id: number): Promise<Actor | null> {
  return fetch(`http://localhost:5001/actors/${id}`, {
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
      if (isActor(data)) {
        return data;
      }
      return null;
    });
}

function getAllActors(): Promise<Actor[]> {
  return fetch('http://localhost:5001/actors')
    .then(response => {
      if (!response.ok) {
        console.error('Error fetching actors:', response.statusText);
        return [];
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data)) {
        return data.filter(isActor);
      }
      return [];
    })
    .catch(error => {
      console.error('Network or parsing error:', error);
      return [];
    });
}

getActor(1).then(data => {
  console.log('Actor data:', data);
});
getAllActors().then(actors => {
  console.log('All actors:', actors);
});

function getActors(ids: number[]): Promise<(Actor | null)[]> {
  const promises = ids.map(id => getActor(id));
  return Promise.all(promises);
}

getActors([6, 40, 2]).then(actors => {
  console.log('Actors data:', actors);
});

function createActor(actor: Omit<Actor, 'id'>): Promise<Actor | null> {
  return fetch('http://localhost:5001/actors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(actor)
  })
    .then(response => {
      if (!response.ok) {
        return null;
      }
      return response.json();
    })
    .then(data => {
      if (isActor(data)) {
        return data;
      }
      return null;
    });
}

function updateActor(actor: Partial<Actor> & { id: number }): Promise<Actor | null> {
  return fetch(`http://localhost:5001/actors/${actor.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(actor)
  })
    .then(response => {
      if (!response.ok) {
        return null;
      }
      return response.json();
    })
    .then(data => {
      if (isActor(data)) {
        return data;
      }
      return null;
    });
}