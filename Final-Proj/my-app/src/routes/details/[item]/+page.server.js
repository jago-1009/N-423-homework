import { error } from '@sveltejs/kit';
import { getDoc, getFirestore, doc, collection } from 'firebase/firestore';
import { getContext } from 'svelte';
/** @type {import('./$types').PageLoad} */

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Loads data based on query parameters from the URL.
 *
/******  874f656f-6895-43d6-932d-06a5dbe6c441  *******/
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

