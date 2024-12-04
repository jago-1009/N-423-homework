<script>
	import { app } from '../../../app/firebaseConfig.js';
	import Card from '../../../components/Card.svelte';
	import {
		getFirestore,
		doc,
		getDoc,
		setDoc,
		onSnapshot,
		collection,
		getDocs,
		query,
		limit,
		where,
		updateDoc,
		arrayUnion,
		or
	} from 'firebase/firestore';
	import { getContext, onMount, setContext, tick } from 'svelte';
	let { data } = $props();
	const db = getFirestore(app);
	const user = getContext('user');
	let headers = ['weapons', 'gear', 'misc'];
	let itemData = $state([]);
	let itemPass = $state([]);
	function getAllItems() {
		headers.forEach(async (header) => {
			const itemsRef = collection(db, header);
			const itemsQuery = await getDocs(itemsRef);
			const itemsArray = itemsQuery.docs.map((doc) => ({
				...doc.data()
			}));
			if (itemsArray.length > 0) {
				itemData.push(itemsArray);
			}
		});
	}
	onMount(async () => {
		let explodedQuery = data.name.split(' ');
		getAllItems();
		setTimeout(() => {
			if (itemData.length > 0) {
				console.log(itemData);
				itemData[0].forEach((element) => {
					console.log(element);
					explodedQuery.forEach((el) => {
						if (
							element.name.toLowerCase().includes(el.toLowerCase()) ||
							element.desc.toLowerCase().includes(el.toLowerCase()) ||
							element.manufacturer.toLowerCase().includes(el.toLowerCase()) ||
							element.distributor.toLowerCase().includes(el.toLowerCase() || element.type.toLowerCase().includes(el.toLowerCase()))
						) {
							itemPass.push(element);
						}
					});
				});
				console.log(itemPass);
			}
		}, 500);
	});
</script>

<div class="search-cards">
	{#each itemPass as item}
		<Card
			imageSrc={item.image || 'https://static.thenounproject.com/png/115013-200.png'}
			imageAlt={item.name}
			imageName={item.name}
			imageTypes={item.type}
			imagePrice="${item.price}"
			imageCollection={item.type}
		/>
	{/each}
</div>

<style>
	.search-cards {
		display: flex;
		justify-content: space-evenly;
		flex-wrap: wrap;
	}
</style>
