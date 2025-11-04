export const INITIAL_DATA = {
roster: [
{ id: 1, name: 'Riley (Groom)' },{ id: 2, name: 'Mike' },{ id: 3, name: 
'Alex' },{ id: 4, name: 'Tom' },
{ id: 5, name: 'Chris' },{ id: 6, name: 'Ben' },{ id: 7, name: 'Jake' },{ 
id: 8, name: 'Ethan' },
{ id: 9, name: 'Sam' },{ id: 10, name: 'Nick' },{ id: 11, name: 'Liam' },{ 
id: 12, name: 'Owen' }
],
resort: [
{ title: 'Main Villa', desc: 'Ocean-view villa with pool', img: '' },
{ title: 'Beach Club', desc: 'Private beach access and bar', img: '' }
],
itinerary: [
{ day: 'Day 1', items: ['Arrival', 'Welcome drinks', 'Dinner at 8pm'] },
{ day: 'Day 2', items: ['Golf at 9am', 'Boat party 2pm', 'Night out 10pm'] 
},
{ day: 'Day 3', items: ['Recovery brunch', 'Check out'] }
],
draft: {
availablePlayers: [1,2,3,4,5,6,7,8,9,10,11,12],
teams: { captainA: [], captainB: [] },
turn: 'captainA',
picks: []
}
};
