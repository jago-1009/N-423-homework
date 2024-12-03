import { error } from '@sveltejs/kit';
import { getDoc, getFirestore, doc, collection } from 'firebase/firestore';
import { getContext } from 'svelte';
/** @type {import('./$types').PageLoad} */

export async function load({ params, url }) {

const itemName = params.entry
const keyParams = url.searchParams.get('key');
 if (!itemName) {
    throw error(404, 'Not found');
}
else {
    console.log("fetching name...")
    return {
        key: keyParams,
        name: itemName,
    }
}
        
    }

