<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    let searchQuery = "";
    let selectedCategory = "";
    let priceMin = "";
    let priceMax = "";
    let showDropdown = false;

    const categories = ["All Categories", "Books", "Electronics", "Clothing", "Furniture"];

    function selectCategory(category) {
        selectedCategory = category;
        showDropdown = false;
        dispatchSearch();
    }

    function dispatchSearch() {
        dispatch("search", {
            query: searchQuery,
            category: selectedCategory,
            minPrice: priceMin,
            maxPrice: priceMax
        });
    }
</script>

<div class="filters-container">
    <div class="filter-group">

        <div class="dropdown" on:click={() => showDropdown = !showDropdown}>
            <div class="dropdown-label">
                {selectedCategory || "Categorías"} ⬇
            </div>
            {#if showDropdown}
                <ul class="dropdown-menu">
                    {#each categories as category}
                        <li on:click={() => selectCategory(category)}>{category}</li>
                    {/each}
                </ul>
            {/if}
        </div>

        <input
            type="number"
            placeholder="Min Price"
            class="dropdown-input"
            bind:value={priceMin}
            on:input={dispatchSearch}
        />
        <input
            type="number"
            placeholder="Max Price"
            class="dropdown-input second-input"
            bind:value={priceMax}
            on:input={dispatchSearch}
        />
    </div>
</div>

<style>
    .filters-container {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
    }
    .filter-group {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }

    .dropdown {
    position: relative;
    cursor: pointer;
    padding: 2px 16px;
    border-radius: 8px;
    min-width: 150px;
    font-size: 16px;
    color: white;
}

   .dropdown-input{
    position: relative;
    cursor: pointer;
    padding: 2px 16px;
    border-radius: 8px;
    max-width: 169px;
    font-size: 16px;
    color: white;
    background-color: transparent; 
    border: none;
   }

   .second-input{
    margin-right: 50px;
   }

   .dropdown-input::placeholder {
    color: white;
    opacity: 1;
}
.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    color: #3f028f;
    list-style: none;
    padding: 0;
    z-index: 10;
    width: 100%;
}

    .dropdown-menu li {
        padding: 10px;
        cursor: pointer;
    }


    .dropdown-label {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }


    @media screen and (max-width: 600px) {
        .filters-container {
            flex-direction: column;
            align-items: stretch;
        }
    }
</style>
