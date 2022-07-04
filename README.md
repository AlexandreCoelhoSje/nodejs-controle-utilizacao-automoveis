# nodejs-controle-utilizacao-automoveis
Sistema web para controlar a utilização dos automóveis de uma empresa

## Preparando o Ambiente

### Banco de Dados
Banco de Dados: o banco utilizado foi o SQLite, um arquivo contendo o banco está no diretório /src/database/database.sqlite, as migrações já foram executadas e o banco está pronto para ser utilizado.

### Para executar o projeto
```sh
npm run dev
```

### Para executar os teste
```sh
npm run test
```

### Interface da API de exemplo parâmetros
Cadastro de automóvel
| Método | Url                        | Parâmetros                                                                            |
| ------ | -------------------------- | ------------------------------------------------------------------------------------- |
| GET    | localhost:3000/vehicle     | localhost:3000/vehicle?color=silver&brand=fiat                                        |
| GET    | localhost:3000/vehicle/:id |                                                                                       |
| POST   | localhost:3000/vehicle     | { "brand": "Chevrolet Onix", "licensePlate": "MMM-1886", "color": "silver" }          |
| PUT    | localhost:3000/vehicle     | { “id”: 1, "brand": "Chevrolet Onix", "licensePlate": "MMM-1886", "color": "silver" } |
| DELETE | localhost:3000/vehicle/:id |                                                                                       |

Cadastro de Motorista
| Método | Url                       | Parâmetros                        |
| ------ | ------------------------- | --------------------------------- |
| GET    | localhost:3000/driver     | localhost:3000/driver?name=Marcos |
| GET    | localhost:3000/driver/:id |                                   |
| POST   | localhost:3000/driver     | { "name": "Marcos Silva" }        |
| PUT    | localhost:3000/driver     | { id: 1, "name": "Marcos Silva" } |
| DELETE | localhost:3000/driver/:id |                                   |

Utilização de um automóvel 
| Método | Url                       | Parâmetros                                                                            |
| ------ | ------------------------- | ------------------------------------------------------------------------------------- |
| GET    | localhost:3000/vehicleUse |                                                                                       |
| POST   | localhost:3000/vehicleUse | { "reason": "reason test", "startDate": "2022-07-05", "driverId": 1, "vehicleId": 1 } |
| PUT    | localhost:3000/vehicleUse | { "id": 1, "endDate": "2022-07-04" }                                                  |

