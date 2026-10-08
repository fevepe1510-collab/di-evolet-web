# EVOLET — Catálogo interactivo

Sitio estático comercial de Di Evolet para Vercel. No necesita backend ni build.

## Oferta vigente comunicada

- **Bigg Cookies**: 11 sabores, **13.000 COP por galleta**.
- **Mini Cookies**: caja surtida de **6 unidades por 39.000 COP**; los seis sabores anunciados están descritos en la página, pero **no se asume que el cliente pueda escoger los seis sabores**.

**Pendiente:** confirmar número comercial de WhatsApp, composición y posibilidad de personalizar la caja Mini, disponibilidad e importe del envío. Hasta configurar WhatsApp, el botón de pedido copia el resumen con cantidades y totales y abre Instagram para enviar el mensaje.

## Configuración

Editar `config.js`:

```js
whatsapp: '57XXXXXXXXXX',
miniBoxCustomizable: false
```

Al configurar un WhatsApp válido, el botón del pedido usa el enlace `https://wa.me/` con texto prearmado.

## Iniciar

```bash
npm start
```

El catálogo usa fotos reales de Di Evolet como **referencias visuales**, no como evidencia verificada de que una fotografía corresponda a cada sabor. No se usa pasarela de pago ni se consideran pedidos confirmados hasta hablar con EVOLET.
