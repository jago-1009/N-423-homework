import { error } from '@sveltejs/kit';
import { getDoc, getFirestore, doc, collection } from 'firebase/firestore';
import { app } from '../../../app/firebaseConfig';
import { getContext } from 'svelte';
/** @type {import('./$types').PageLoad} */

export async function load({ params, url }) {

const key = url.searchParams.get('key');
const itemName = params.item
 if (!key || !itemName) {
    throw error(404, 'Not found');
}
        return {
            key: key,
            name: itemName,
        }
    }

