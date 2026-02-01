# Guía: Limpiar Historial de Git

## Objetivo
Crear un historial limpio con un solo commit de JulioMCruz.

## ⚠️ IMPORTANTE: Lee TODO antes de ejecutar

---

## Paso 0: Verificar Identidad

```bash
git config user.name
git config user.email
```

**DEBE mostrar:**
- Name: JulioMCruz
- Email: julio.cruz@eb-ms.net

Si NO es correcto, ejecuta:
```bash
git config --global user.name "JulioMCruz"
git config --global user.email "julio.cruz@eb-ms.net"
```

---

## Paso 1: Ir al directorio del proyecto

```bash
cd /root/neo/perky-news
```

---

## Paso 2: Verificar que estás en main y actualizado

```bash
git checkout main
git pull origin main
```

---

## Paso 3: Crear backup (por si algo sale mal)

```bash
git branch backup-before-clean
```

Verifica que se creó:
```bash
git branch
```

Debes ver:
```
  backup-before-clean
* main
```

---

## Paso 4: Crear branch orphan (sin historial)

```bash
git checkout --orphan clean-main
```

**¿Qué hace esto?** Crea un branch nuevo SIN ningún historial previo.

---

## Paso 5: Agregar todos los archivos

```bash
git add -A
```

Verifica:
```bash
git status
```

Debe mostrar muchos archivos en verde (staged).

---

## Paso 6: Hacer el commit único

```bash
git commit -m "feat: Perky News MVP with x402 payment integration

- Landing page with PerkOS branding
- Article listing and detail pages
- x402 premium subscription integration
- Netlify deployment configuration
- Supabase database integration"
```

---

## Paso 7: Eliminar el branch main viejo

```bash
git branch -D main
```

---

## Paso 8: Renombrar clean-main a main

```bash
git branch -m main
```

Verifica:
```bash
git branch
```

Debe mostrar:
```
  backup-before-clean
* main
```

---

## Paso 9: Force push a GitHub

```bash
git push -f origin main
```

**IMPORTANTE:** El `-f` (force) es necesario porque estamos reescribiendo el historial.

---

## Paso 10: Verificar en GitHub

Ve a: https://github.com/PerkOS-xyz/perky-news/commits/main

Debe mostrar UN SOLO commit de "JulioMCruz".

---

## Paso 11: Limpiar backup (opcional, después de verificar)

Solo si todo salió bien:
```bash
git branch -D backup-before-clean
git push origin --delete backup-before-clean 2>/dev/null || true
```

---

## Si algo sale mal

### Restaurar desde backup:
```bash
git checkout backup-before-clean
git branch -D main
git branch -m main
git push -f origin main
```

### O pedir ayuda a Winston/Julio

---

## Resumen de comandos (NO copies todo junto)

Ejecuta UNO POR UNO y verifica cada paso:

```bash
# Preparación
cd /root/neo/perky-news
git checkout main
git pull origin main
git branch backup-before-clean

# Crear historial limpio
git checkout --orphan clean-main
git add -A
git commit -m "feat: Perky News MVP with x402 payment integration"

# Reemplazar main
git branch -D main
git branch -m main
git push -f origin main
```

---

## Verificación Final

1. ✅ `git log --oneline` muestra UN solo commit
2. ✅ `git log` muestra autor "JulioMCruz <julio.cruz@eb-ms.net>"
3. ✅ GitHub muestra historial limpio
4. ✅ https://perky-news.netlify.app sigue funcionando

---
*Guía creada por Winston - 2026-01-31*
