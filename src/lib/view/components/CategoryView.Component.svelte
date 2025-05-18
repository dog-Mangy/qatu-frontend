<script>
  import { onMount } from 'svelte';
  import CategoryGrid from './Category.Component.svelte';
  import { fetchCategories } from '../../viewmodel/viewmodels/categoryViewModel.js';
  import { deleteCategoryById } from '../../viewmodel/viewmodels/deleteCategoryByid.js';
  import { updateCategoryById } from '../../viewmodel/viewmodels/updateCategory.js';
  import { createCategory } from '../../viewmodel/viewmodels/createCategory.js';



  let categories = [];
  let creatingCategory = false;
  let selectedCategory = null;
  let name = '';
  let description = '';

  onMount(async () => {
    categories = await fetchCategories();
  });

  async function handleDeleteCategory(event) {
    const id = event.detail.id;
    await deleteCategoryById(id);
    categories = categories.filter(c => c.id !== id);
  }

  function handleViewCategory(event) {
    selectedCategory = event.detail.category;
    name = selectedCategory.name;
    description = selectedCategory.description ?? '';
  }

    function closeModal() {
    selectedCategory = null;
    creatingCategory = false;
    name = '';
    description = '';
  }


  async function saveChanges() {
    const payload = { name, description };

    try {
      if (creatingCategory) {
        const newCategory = await createCategory(payload);
        categories = [...categories, newCategory];
      } else if (selectedCategory) {
        const updatedCategory = await updateCategoryById(selectedCategory.id, payload);
        categories = categories.map(c =>
          c.id === selectedCategory.id ? { ...c, ...updatedCategory } : c
        );
      }
      closeModal();
    } catch (error) {
      console.error('Error al guardar categoría:', error);
    }
  }
</script>

<CategoryGrid
  {categories}
  on:deleteCategory={handleDeleteCategory}
  on:viewCategory={handleViewCategory}
  on:createCategory={() => {
    creatingCategory = true;
    selectedCategory = null;
    name = '';
    description = '';
  }}
/>

{#if selectedCategory || creatingCategory}
    <div
      class="modal-backdrop"
      role="button"
      tabindex="0"
      on:click={closeModal}
      on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && closeModal()}
    >
    <div
      class="modal"
      role="dialog"
      aria-modal="true"
      tabindex="0"
      on:click|stopPropagation
      on:keydown={(e) => {
        if (e.key === 'Escape') closeModal();
      }}
    >

      {#if selectedCategory}
        <img src={selectedCategory.image} alt={name} />
      {/if}
      <input bind:value={name} placeholder="Nombre" />
      <textarea bind:value={description} placeholder="Descripción"></textarea>
      <div class="buttons">
        <button on:click={saveChanges}>Guardar</button>
        <button on:click={closeModal}>Cancelar</button>
      </div>
    </div>
  </div>
{/if}


<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 400px;
    width: 90%;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  }

  .modal img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-bottom: 1rem;
  }

  .modal input,
  .modal textarea {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }

  .buttons button {
    flex: 1;
    margin: 0 0.5rem;
    padding: 0.5rem;
  }
</style>
