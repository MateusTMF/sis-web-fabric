export const mockSummary = [
  { id: 's1', title: 'Requisições pendentes', value: 4, desc: 'Aguardando aprovação' },
  { id: 's2', title: 'Itens críticos', value: 12, desc: 'Estoque abaixo do mínimo' },
  { id: 's3', title: 'OPs ativas', value: 3, desc: 'Em produção' }
];

export const mockItems = [
  { sku: 'ABC123', name: 'Parafuso M6', qty: 3, loc: 'Almoxarifado A' },
  { sku: 'PCBA-01', name: 'Placa PCB', qty: 0, loc: 'Almoxarifado B' },
  { sku: 'MTR-220', name: 'Motor 220v', qty: 1, loc: 'Almoxarifado A' }
];

export const mockRequests = [
  { id: 'r1', requester: 'João', department: 'Produção', date: '2025-10-01', status: 'Pendente', items: [{ sku: 'ABC123', qty: 10 }] },
  { id: 'r2', requester: 'Mariana', department: 'Manutenção', date: '2025-10-02', status: 'Aprovado', items: [{ sku: 'PCBA-01', qty: 2 }] }
];

export const mockOrders = [
  { id: 'OP-001', product: 'Transformador TX-01', qty: 20, status: 'Em produção' },
  { id: 'OP-002', product: 'Painel Controle', qty: 5, status: 'Planejada' }
];

export const mockProfiles = [
  { id: 'p-admin', name: 'Admin', description: 'Acesso total' },
  { id: 'p-estoque', name: 'Almoxarife', description: 'Gerencia estoque e requisições' }
];

export const mockUsers = [
  { id: 'u-1', name: 'Admin Trafo', email: 'admin@trafo.com', profile: mockProfiles[0] },
  { id: 'u-2', name: 'Carlos', email: 'carlos@trafo.com', profile: mockProfiles[1] }
];
