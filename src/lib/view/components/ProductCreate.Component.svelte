<script>
  import { createProduct } from '../../viewmodel/viewmodels/productViewModel.js';
  import { fetchCategories } from '../../viewmodel/viewmodels/categoryViewModel.js';
  import { getStoresByUserId } from '../../viewmodel/viewmodels/storeViewModel.js';
  import { push } from 'svelte-spa-router';
  import { onMount } from 'svelte';
  import { authViewModel } from '../../viewmodel/viewmodels/authViewModel';

  let name = '';
  let description = '';
  let price = '';
  let stock = '';
  let categoryId = '';
  let storeId = '';
  let error = '';
  let success = '';
  let categories = [];

  onMount(async () => {
    try {
      categories = await fetchCategories();

      const userId = await authViewModel.getUUID();
      if (!userId) {
        error = 'No se pudo obtener el ID del usuario';
        return;
      }

      const stores = await getStoresByUserId(userId);
      if (stores.length > 0) {
        storeId = stores[0].id;
      } else {
        error = 'No tienes tiendas registradas';
      }
    } catch (err) {
      error = err.message || 'Error al cargar datos';
    }
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createProduct({
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        categoryId,
        storeId
      });
      success = 'Producto creado correctamente';
      setTimeout(() => push('/mystore'), 1200);
    } catch (err) {
      error = err.message || 'Error al crear producto';
    }
  }
</script>

<div class="form-container">
  <form class="product-form" on:submit={handleSubmit}>
    <h2>Crear producto</h2>
    {#if error}<div class="alert error">{error}</div>{/if}
    {#if success}<div class="alert success">{success}</div>{/if}

    <div class="form-group">
      <label for="name">Nombre</label>
      <input id="name" bind:value={name} required placeholder="Nombre del producto" />
    </div>

    <div class="form-group">
      <label for="description">Descripción</label>
      <textarea id="description" bind:value={description} rows="3" placeholder="Describe tu producto"></textarea>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="price">Precio</label>
        <input id="price" type="number" min="0" step="0.01" bind:value={price} required placeholder="0.00" />
      </div>
      <div class="form-group">
        <label for="stock">Stock</label>
        <input id="stock" type="number" min="0" bind:value={stock} required placeholder="Cantidad" />
      </div>
    </div>

    <div class="form-group">
      <label for="category">Categoría</label>
      <select id="category" bind:value={categoryId} required>
        <option value="" disabled selected>Selecciona una categoría</option>
        {#each categories as cat}
          <option value={cat.id}>{cat.name}</option>
        {/each}
      </select>
    </div>

    <button class="submit-btn" type="submit">Guardar producto</button>
  </form>
</div>

<style>
  .form-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(120deg, #f3f0ff 0%, #e9e4f0 100%);
  }

  .product-form {
    background: #fff;
    padding: 2.5rem 2rem;
    border-radius: 12px;
    box-shadow: 0 6px 32px rgba(63,2,143,0.10), 0 1.5px 6px rgba(63,2,143,0.08);
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .product-form h2 {
    margin-bottom: 0.5rem;
    color: #3f028f;
    font-size: 1.7rem;
    text-align: center;
    font-weight: 700;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .form-row {
    display: flex;
    gap: 1rem;
  }

  .form-row .form-group {
    flex: 1;
  }

  label {
    font-size: 1rem;
    color: #3f028f;
    font-weight: 500;
  }

  input, textarea, select {
    padding: 0.6rem 0.8rem;
    border: 1.5px solid #cfc6e6;
    border-radius: 6px;
    font-size: 1rem;
    background: #faf8ff;
    color: #333;
    transition: border-color 0.2s;
  }

  input:focus, textarea:focus, select:focus {
    border-color: #3f028f;
    outline: none;
  }

  .submit-btn {
    margin-top: 1rem;
    background: linear-gradient(90deg, #3f028f 60%, #5a0bb8 100%);
    color: #fff;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    padding: 0.8rem 0;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.2s;
  }

  .submit-btn:hover {
    background: linear-gradient(90deg, #5a0bb8 60%, #3f028f 100%);
  }

  .alert {
    padding: 0.7rem 1rem;
    border-radius: 5px;
    font-size: 0.98rem;
    margin-bottom: 0.5rem;
    text-align: center;
  }
  .alert.error {
    background: #ffeaea;
    color: #b8002f;
    border: 1px solid #ffb3c6;
  }
  .alert.success {
    background: #eaffea;
    color: #1a7f3c;
    border: 1px solid #b3ffd1;
  }

  @media (max-width: 600px) {
    .product-form {
      padding: 1.2rem 0.5rem;
      max-width: 98vw;
    }
    .form-row {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
</style>