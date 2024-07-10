const formatCurrency = (value) => parseFloat(value).toFixed(2);
/** @type import('@tanstack/react-table').ColumnDef<any>*/
const columns = [
  {
    header: 'Depo İsmi',
    accessorKey: 'DepoIsmi',
    filterFn: 'includesString'
  },
  {
    header: 'Depo Kodu',
    accessorKey: 'DepoKodu',
    filterFn: 'includesString'
  },
  {
    header: 'Stok Adı',
    accessorKey: 'StokAdi',
    filterFn: 'includesString'
  },
  {
    header: 'Stok Kodu',
    accessorKey: 'StokKodu',
    filterFn: 'includesString'
  },
  {
    header: 'Stok KDV Oranı',
    accessorKey: 'Stok Kdv Oran',
    filterFn: 'includesString',
    cell: ({ getValue }) => formatCurrency(getValue())
  },
  {
    header: 'Stok Fiyat',
    accessorKey: 'StokFiyat',
    filterFn: 'includesString',
    cell: ({ getValue }) => formatCurrency(getValue()),
    isNumeric: true
  },
  {
    header: 'Stok Fiyat2',
    accessorKey: 'StokFiyat2',
    filterFn: 'includesString',
    cell: ({ getValue }) => formatCurrency(getValue()),
    isNumeric: true
  },
  {
    header: 'Stok Fiyat3',
    accessorKey: 'StokFiyat3',
    filterFn: 'includesString',
    cell: ({ getValue }) => formatCurrency(getValue()),
    isNumeric: true
  },
  {
    header: 'Stok Birim',
    accessorKey: 'StokBirim',
    filterFn: 'includesString'
  },
  {
    header: 'Stok Barkod1',
    accessorKey: 'StokBarkod1',
    filterFn: 'includesString'
  },
  {
    header: 'Stok Barkod2',
    accessorKey: 'StokBarkod2',
    filterFn: 'includesString'
  },
  {
    header: 'Stok Barkod3',
    accessorKey: 'StokBarkod3',
    filterFn: 'includesString'
  },
  {
    header: 'Üretici Kodu',
    accessorKey: 'UreticiKodu',
    filterFn: 'includesString'
  },
  {
    header: 'Grup Kodu',
    accessorKey: 'GrupKodu',
    filterFn: 'includesString'
  },
  {
    header: 'Kod1',
    accessorKey: 'Kod1',
    filterFn: 'includesString'
  },
  {
    header: 'Kod2',
    accessorKey: 'Kod2',
    filterFn: 'includesString'
  },
  {
    header: 'Kod3',
    accessorKey: 'Kod3',
    filterFn: 'includesString'
  },
  {
    header: 'Kod4',
    accessorKey: 'Kod4',
    filterFn: 'includesString'
  },
  {
    header: 'Kod5',
    accessorKey: 'Kod5',
    filterFn: 'includesString'
  },
  {
    header: 'Grup İsim',
    accessorKey: 'GrupIsim',
    filterFn: 'includesString'
  },
  {
    header: 'Grup İsim1',
    accessorKey: 'GrupIsim1',
    filterFn: 'includesString'
  },
  {
    header: 'Grup İsim2',
    accessorKey: 'GrupIsim2',
    filterFn: 'includesString'
  },
  {
    header: 'Grup İsim3',
    accessorKey: 'GrupIsim3',
    filterFn: 'includesString'
  },
  {
    header: 'Grup İsim4',
    accessorKey: 'GrupIsim4',
    filterFn: 'includesString'
  },
  {
    header: 'Grup İsim5',
    accessorKey: 'GrupIsim5',
    filterFn: 'includesString'
  },
  {
    header: 'Müşteri Toplam Sipariş',
    accessorKey: 'MusteriToplamSiparis',
    filterFn: 'includesString'
  },
  {
    header: 'Müşteri Toplam Teslimat',
    accessorKey: 'MusteriToplamTeslimat',
    filterFn: 'includesString'
  },
  {
    header: 'Müşteri Sipariş Bakiye',
    accessorKey: 'MusteriSiparisBakiye',
    filterFn: 'includesString',
    cell: ({ getValue }) => formatCurrency(getValue()),
    isNumeric: true
  },
  {
    header: 'Satınalma Toplam Sipariş',
    accessorKey: 'SatinalmaToplamSiparis',
    filterFn: 'includesString'
  },
  {
    header: 'Satınalma Toplam Teslim',
    accessorKey: 'SatinalmaToplamTeslim',
    filterFn: 'includesString'
  },
  {
    header: 'Satınalma Sipariş Bakiye',
    accessorKey: 'SatinalmaSiparisBakiye',
    filterFn: 'includesString',
    cell: ({ getValue }) => formatCurrency(getValue()),
    isNumeric: true
  },
  {
    header: 'Toplam Çıkış Miktarı',
    accessorKey: 'ToplamCikisMiktari',
    filterFn: 'includesString'
  },
  {
    header: 'Toplam Giriş Miktarı',
    accessorKey: 'ToplamGirisMiktari',
    filterFn: 'includesString'

  },
  {
    header: 'Toplam Bakiye',
    accessorKey: 'ToplamBakiye',
    filterFn: 'includesString',
    cell: ({ getValue }) => formatCurrency(getValue()),
    isNumeric: true
  },
]

export default columns;