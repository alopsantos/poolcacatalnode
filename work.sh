#!/bin/bash

# Definições
API_URL="https://bitcoinflix.replit.app/api/block"
ADDRESS_FILE="tests/pool67.txt"
API_TOKEN=""

# Verifica se 'jq' está instalado
if ! command -v jq &> /dev/null; then
    echo "Erro: jq não está instalado! Instale com 'sudo apt install jq' ou 'brew install jq'."
    exit 1
fi

# Obtém os dados da API com autenticação
JSON_RESPONSE=$(curl -s -H "pool-token: $API_TOKEN" "$API_URL")

# Debug opcional: Descomente a linha abaixo para ver a resposta bruta da API
# echo "Resposta da API: $JSON_RESPONSE"

# Verifica se o JSON é válido
if ! echo "$JSON_RESPONSE" | jq empty 2>/dev/null; then
    echo "Erro: JSON inválido recebido da API!"
    exit 1
fi

# Extrai os valores start e end do range
START=$(echo "$JSON_RESPONSE" | jq -r '.range.start' 2>/dev/null)
END=$(echo "$JSON_RESPONSE" | jq -r '.range.end' 2>/dev/null)

# Verifica se os valores foram extraídos corretamente
if [[ -z "$START" || -z "$END" ]]; then
    echo "Erro ao extrair o range!"
    exit 1
else
    RANGE="$START $END"
    echo "Range extraído: $RANGE"
fi

# Extrai os endereços e salva no arquivo
echo "$JSON_RESPONSE" | jq -r '.checkwork_addresses[]' > "$ADDRESS_FILE" 2>/dev/null

sed -i '$ s/$/ 1BY8GQbnueYofwSuFAT3USAhGjPrkxDdW9/' tests/pool67.txt

# Verifica se o arquivo foi gerado corretamente
if [[ -s "$ADDRESS_FILE" ]]; then
    echo "Checkwork addresses salvos em $ADDRESS_FILE"
else
    echo "Erro ao salvar checkwork addresses!"
    exit 1
fi
