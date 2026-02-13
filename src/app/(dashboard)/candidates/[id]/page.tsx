'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCandidate, useDeleteCandidate } from '@/hooks/useCandidates';
import PageHeader from '@/components/layout/PageHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { CANDIDATE_SOURCE_LABELS } from '@/lib/constants';
import { formatDate, getInitials } from '@/lib/utils';
import { Pencil, Trash2, Mail, Phone, MapPin, Briefcase, Building2, ArrowLeft, ExternalLink, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CandidateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: response, isLoading } = useCandidate(id);
  const deleteCandidate = useDeleteCandidate();
  const [showDelete, setShowDelete] = useState(false);
  const candidate = response?.data;

  if (isLoading) return <div className="flex h-64 items-center justify-center"><Spinner size="lg" /></div>;
  if (!candidate) return <div className="py-12 text-center text-gray-500">Candidate not found</div>;

  const handleDelete = async () => {
    await deleteCandidate.mutateAsync(id);
    router.push('/candidates');
  };

  return (
    <div>
      <div className="mb-4">
        <Link href="/candidates" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"><ArrowLeft className="h-4 w-4" /> Back to Candidates</Link>
      </div>

      <PageHeader
        title={`${candidate.firstName} ${candidate.lastName}`}
        description={candidate.currentTitle ? `${candidate.currentTitle}${candidate.currentCompany ? ` at ${candidate.currentCompany}` : ''}` : undefined}
        action={
          <div className="flex items-center gap-3">
            <Link href={`/candidates/${id}/edit`}><Button variant="outline" leftIcon={<Pencil className="h-4 w-4" />}>Edit</Button></Link>
            <Button variant="danger" leftIcon={<Trash2 className="h-4 w-4" />} onClick={() => setShowDelete(true)}>Delete</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Profile</h3>
            <div className="flex items-start gap-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700">
                {getInitials(`${candidate.firstName} ${candidate.lastName}`)}
              </div>
              <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-gray-400" /><a href={`mailto:${candidate.email}`} className="text-sm text-blue-600 hover:underline">{candidate.email}</a></div>
                {candidate.phone && <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-gray-400" /><span className="text-sm">{candidate.phone}</span></div>}
                {candidate.location && <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gray-400" /><span className="text-sm">{candidate.location}</span></div>}
                {candidate.currentTitle && <div className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-gray-400" /><span className="text-sm">{candidate.currentTitle}</span></div>}
                {candidate.currentCompany && <div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-gray-400" /><span className="text-sm">{candidate.currentCompany}</span></div>}
                {candidate.experienceYears != null && <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-gray-400" /><span className="text-sm">{candidate.experienceYears} years experience</span></div>}
              </div>
            </div>
          </Card>

          {candidate.notes && (
            <Card>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Notes</h3>
              <p className="whitespace-pre-wrap text-sm text-gray-600">{candidate.notes}</p>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Details</h3>
            <div className="space-y-3">
              <div><p className="text-xs text-gray-500">Source</p><Badge>{CANDIDATE_SOURCE_LABELS[candidate.source]}</Badge></div>
              <div><p className="text-xs text-gray-500">Added</p><p className="text-sm font-medium text-gray-900">{formatDate(candidate.createdAt)}</p></div>
              {candidate.resumeUrl && (
                <div><p className="text-xs text-gray-500">Resume</p><a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline">View Resume <ExternalLink className="h-3 w-3" /></a></div>
              )}
              {candidate.linkedinUrl && (
                <div><p className="text-xs text-gray-500">LinkedIn</p><a href={candidate.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline">LinkedIn Profile <ExternalLink className="h-3 w-3" /></a></div>
              )}
              {candidate.portfolioUrl && (
                <div><p className="text-xs text-gray-500">Portfolio</p><a href={candidate.portfolioUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline">Portfolio <ExternalLink className="h-3 w-3" /></a></div>
              )}
            </div>
          </Card>

          {candidate.skills.length > 0 && (
            <Card>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Skills</h3>
              <div className="flex flex-wrap gap-2">{candidate.skills.map((s) => <Badge key={s} variant="bg-blue-100 text-blue-800">{s}</Badge>)}</div>
            </Card>
          )}

          {candidate.tags.length > 0 && (
            <Card>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Tags</h3>
              <div className="flex flex-wrap gap-2">{candidate.tags.map((t) => <Badge key={t} variant="bg-purple-100 text-purple-800">{t}</Badge>)}</div>
            </Card>
          )}
        </div>
      </div>

      <ConfirmDialog isOpen={showDelete} onClose={() => setShowDelete(false)} onConfirm={handleDelete} title="Delete Candidate" message="Are you sure you want to delete this candidate? All associated applications will also be affected." confirmLabel="Delete" isLoading={deleteCandidate.isPending} />
    </div>
  );
}
