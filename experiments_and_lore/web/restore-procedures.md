# 💾 Procedimientos de Restauración · ARKHÉ ZERO

## 🜂 Escenarios

| Escenario                       | RTO      | RPO     |
|---------------------------------|----------|---------|
| Fallo de pod                    | < 1 min  | 0       |
| Fallo de nodo                   | < 5 min  | 0       |
| Fallo de zona                   | < 1 h    | 5 min   |
| Fallo de región                 | < 4 h    | 1 h     |
| Corrupción de datos             | < 24 h   | 1 día   |
| Pérdida del Índice Cero local   | < 1 h    | 0       |

## 🜃 Fuentes de restauración

1. **Velero** · snapshots k8s + volúmenes
2. **Ethereum** · Merkle roots + hashes
3. **Arweave** · export cifrado perpetuo
4. **Shamir shards** · 51 de 100 custodios
5. **Local** · copia del dispositivo humano

## 🜄 Procedimiento general

```bash
# 1. Verificar el Índice Cero
kubectl exec -it arkhe-web -- python scripts/index-cero-verify.py

# 2. Reconstruir shards (requiere 51)
python scripts/restore-shards.py --shards=51

# 3. Restaurar desde Velero
velero restore create --from-backup arkhe-zero-daily

# 4. Verificar firma final
python scripts/verify-seal.py --strict
```

## 🜁 Reglas

```diff
+ Toda restauración se firma
+ Toda restauración se ancla a Ethereum
+ Toda restauración se documenta en audit.log
- NUNCA restaurar sin verificar hashes
- NUNCA restaurar sin ceremonia
```

---

`◯_● · 51/49/100 · KRONOS · restore`