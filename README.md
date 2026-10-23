# BOZZETTO Home & Deco — Propuesta visual NovaTec

Proyecto de demostración independiente preparado para conversación comercial con Bozzetto Home & Deco. **No es un sitio oficial ni un catálogo con inventario verificado.**

## Qué incluye

- Apertura cinematográfica con cortinas, monograma y microanimaciones.
- Diseño editorial marfil / negro / terracota, preparado para escritorio y móvil.
- Secciones de esencia, líneas de mobiliario, historia, moodboard interactivo, proceso y showroom.
- Formulario que prepara mensajes de WhatsApp al número **+595 971 505963**, sin almacenar datos.
- Menú adaptable, navegación con teclado y respeto por `prefers-reduced-motion`.
- Pruebas de humo Playwright en `tests/bozzetto-qa.mjs` y capturas de pantalla en GitHub Actions.

## Fuentes y hechos utilizados

- Contacto, nombre comercial y atención 09:00–18:00: captura del perfil de WhatsApp Business suministrada para la propuesta.
- Dirección del local: **25 de Mayo esq. Acá Carayá, barrio Seminario, Asunción**, publicada por InfoNegocios (2019) y listada en el directorio de BOZZETTO HOME & DECO.
- Horario extendido de referencia: lun–vie 09–18, sáb 09–13, según ficha pública de negocio; puede cambiar.
- Historia de mobiliario a medida, MDF, melamina, terminación ABS, cocinas, placares y dormitorios: [InfoNegocios, 28/08/2015](https://infonegocios.com.py/default/los-si-y-los-no-en-el-dormitorio). Es información histórica y se presenta con esa salvedad.
- Aniversario de diez años en 2019: [InfoNegocios, 12/04/2019](https://infonegocios.com.py/infomicasa?page=52).
- Fotografías arquitectónicas/de mobiliario: **Unsplash**, utilizadas solo como inspiración; **no representan el inventario ni trabajos propios de Bozzetto**.
- `assets/bozzetto-mark.svg` es una **interpretación vectorial conceptual** inspirada en el avatar aportado, **no un archivo oficial de marca**.

## Publicación y edición

Sitio estático en `index.html`; GitHub Pages publica la rama `main`. Para modificar contacto o categorías, editar `index.html`. No requiere backend ni servicios de pago.

## Control de calidad

GitHub Actions ejecuta `.github/workflows/bozzetto-visual.yml`; comprueba identidad, intro, imágenes de colección, menú móvil, moodboard, CTA, formularios y consola JS; guarda capturas desktop y mobile como artefactos.

## Pendiente para versión oficial

Obtener logo vectorial autorizado, fotos auténticas, listado vigente de productos/servicios, aprobación de textos, horarios y derechos de uso de imágenes; retirar `noindex,nofollow` solo al publicar un sitio oficial aprobado.
